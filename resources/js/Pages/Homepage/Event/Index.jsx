import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link } from "@inertiajs/react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useState } from "react";

dayjs.extend(LocalizedFormat);

export default function Index({ auth, events }) {
    const [filter, setFilter] = useState(""); // User filter
    const [search, setSearch] = useState(""); // Search filter

    // Filter events based on search and selected user
    const filteredEvents = events.filter((event) => {
        const matchesUser = !filter || event.user.id === Number(filter);
        const matchesSearch = event.title
            .toLowerCase()
            .includes(search.toLowerCase());
        return matchesUser && matchesSearch;
    });

    // Extract unique users for filtering
    const uniqueUsers = Array.from(
        new Set(events.map((event) => event.user.id))
    ).map((id) => {
        const user = events.find((event) => event.user.id === id)?.user;
        return { id: user.id, name: user.name };
    });

    return (
        <HomeLayout auth={auth}>
            <Head title="Events" />
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Filter Dropdown */}
                <div className="flex items-center justify-between">
                    <div className="mb-4">
                        <label
                            htmlFor="filter"
                            className="mr-2 text-gray-700 font-medium"
                        >
                            Filter:
                        </label>
                        <select
                            id="filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border rounded px-3 py-2"
                        >
                            <option value="">All Users</option>
                            {uniqueUsers.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Events List */}
                <div className="mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
                    {filteredEvents.map((event) => (
                        <div
                            key={event.id}
                            className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                        >
                            <Link href={route("event.home.show", event.id)}>
                                {/* Event Image */}
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-72 w-full object-cover"
                                        src={`/storage/${event.image}`}
                                        alt={event.title}
                                    />
                                </div>

                                {/* Event Details */}
                                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium flex gap-2 items-center">
                                                📅{" "}
                                                {event.start !== event.end ? (
                                                    <>
                                                        <time
                                                            dateTime={
                                                                event.start
                                                            }
                                                        >
                                                            {dayjs(
                                                                event.start
                                                            ).format("LL")}
                                                        </time>{" "}
                                                        to{" "}
                                                        <time
                                                            dateTime={event.end}
                                                        >
                                                            {dayjs(
                                                                event.end
                                                            ).format("LL")}
                                                        </time>
                                                    </>
                                                ) : (
                                                    <time
                                                        dateTime={event.start}
                                                    >
                                                        {dayjs(
                                                            event.start
                                                        ).format("LL")}
                                                    </time>
                                                )}
                                            </p>
                                            <p className="text-sm font-medium flex items-center gap-1">
                                                ⏰{" "}
                                                {dayjs(
                                                    `2000-01-01 ${event.start_time}`
                                                ).format("h:mm A")}{" "}
                                                -{" "}
                                                {dayjs(
                                                    `2000-01-01 ${event.end_time}`
                                                ).format("h:mm A")}
                                            </p>
                                            <p className="text-sm font-medium flex items-center gap-1">
                                                🏢 Venue:{" "}
                                                <span>{event.venue}</span>
                                            </p>
                                            <p className="text-sm font-medium flex items-center gap-1">
                                                🧑‍🤝‍🧑 Attendees:{" "}
                                                {event.attendees
                                                    .sort((a, b) => {
                                                        const order = [
                                                            "1st Year",
                                                            "2nd Year",
                                                            "3rd Year",
                                                            "4th Year",
                                                        ];
                                                        return (
                                                            order.indexOf(a) -
                                                            order.indexOf(b)
                                                        );
                                                    })
                                                    .join(", ")}
                                            </p>

                                            {/*                                                 {event.attendees} */}
                                        </div>
                                        <div className="block mt-2">
                                            <p className="text-xl font-semibold text-gray-900">
                                                {event.title}
                                            </p>
                                            <p className="mt-3 text-base text-gray-500 line-clamp-3">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Organizer */}
                                    <div className="mt-6 flex items-center">
                                        <img
                                            className="h-7 w-7 rounded-full"
                                            src="https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png"
                                            alt=""
                                        />
                                        <p className="ml-3 text-base font-medium text-gray-900">
                                            {event.user.name}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}
