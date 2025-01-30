import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link } from "@inertiajs/react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useState } from "react";

dayjs.extend(LocalizedFormat);

export default function Index({ auth, events }) {
    const [filter, setFilter] = useState(""); // Initial filter is empty

    const filteredEvent = events.filter((event) => {
        if (!filter) return true; // Show all posts if no filter is selected
        return event.user.id === Number(filter); // Convert filter to a number
    });
    return (
        <HomeLayout auth={auth}>
            <Head title="Events" />
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
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
                        {[
                            ...new Map(
                                events.map((event) => [
                                    event.user.id,
                                    event.user.name,
                                ]) // Create a unique map of user IDs and names
                            ).entries(),
                        ].map(([userId, userName], index) => (
                            <option key={index} value={userId}>
                                {userName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className=" mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
                    {filteredEvent.map((event) => (
                        <div>
                            <Link
                                href={route("event.home.show", event.id)}
                                key={event.id}
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
                                        <div className="flex items-center gap-4">
                                            <p className="text-sm font-medium flex gap-2 items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                                    />
                                                </svg>
                                                <div>
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
                                                </div>
                                            </p>
                                            <span aria-hidden="true">
                                                &middot;
                                            </span>
                                            <div className="flex gap-2 items-center text-sm font-medium">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                                <time
                                                    dateTime={event.start_time}
                                                >
                                                    {dayjs(
                                                        `2000-01-01 ${event.start_time}`
                                                    ).format("h:mm A")}
                                                </time>{" "}
                                                -{" "}
                                                <time dateTime={event.end_time}>
                                                    {dayjs(
                                                        `2000-01-01 ${event.end_time}`
                                                    ).format("h:mm A")}
                                                </time>
                                            </div>
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
                                                <span className="sr-only">
                                                    {event.user.name}
                                                </span>
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
                        </div>
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}
