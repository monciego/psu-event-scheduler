import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Create from "./Create";
import Edit from "./Edit";
import Delete from "./Delete";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import isBetween from "dayjs/plugin/isBetween"; // Import isBetween plugin
dayjs.extend(LocalizedFormat);
dayjs.extend(isBetween); // Extend Day.js with isBetween

export default function Index({ events }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const handleDownload = () => {
        window.location.href = "/generate-event-report";
    };

    const today = dayjs().startOf("day");

    const filteredEvents = events
        .filter((event) =>
            event.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((event) => {
            const startDate = dayjs(event.start);
            const endDate = dayjs(event.end);

            if (filter === "ongoing")
                return today.isBetween(startDate, endDate, "day", "[]");
            if (filter === "upcoming") return startDate.isAfter(today);
            if (filter === "done") return endDate.isBefore(today);

            return true; // Show all events if no filter is applied
        });

    return (
        <AuthenticatedLayout>
            <Head title="Events" />

            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="flex items-center justify-between mb-10">
                    <h3 className="font-medium text-2xl">Events</h3>
                    <div className="flex items-center gap-2">
                        <Create />
                        <PrimaryButton
                            className="bg-indigo-600 hover:bg-indigo-700"
                            onClick={handleDownload}
                        >
                            Download Report
                        </PrimaryButton>
                    </div>
                </header>

                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="all">All</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div className="mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div key={event.id}>
                                <Link
                                    href={route("events.show", event.id)}
                                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-72 w-full object-cover"
                                            src={`/storage/${event.image}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium flex gap-2 items-center">
                                                    📅{" "}
                                                    {event.start !==
                                                    event.end ? (
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
                                                                dateTime={
                                                                    event.end
                                                                }
                                                            >
                                                                {dayjs(
                                                                    event.end
                                                                ).format("LL")}
                                                            </time>
                                                        </>
                                                    ) : (
                                                        <time
                                                            dateTime={
                                                                event.start
                                                            }
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
                                                                order.indexOf(
                                                                    a
                                                                ) -
                                                                order.indexOf(b)
                                                            );
                                                        })
                                                        .join(", ")}
                                                </p>
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
                                        <div className="mt-6 flex items-center">
                                            <div className="flex-shrink-0">
                                                <h3>
                                                    <img
                                                        className="h-7 w-7 rounded-full"
                                                        src="https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png"
                                                        alt=""
                                                    />
                                                </h3>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-base font-medium text-gray-900">
                                                    {event.user.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex gap-2 mt-2">
                                    <Edit eventData={event} />
                                    <Delete eventData={event} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            No events found.
                        </p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
