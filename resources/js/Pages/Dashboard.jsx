import Carousel from "@/Components/carousel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import dayjs from "dayjs";

export default function Dashboard({ events }) {
    const today = dayjs().startOf("day");
    const upcomingEventImage = events
        .filter((event) => dayjs(event.start).isAfter(today))
        .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)))[0]; // Sort and get the first event

    const eventImages = events
        .filter((event) => dayjs(event.start).isAfter(today))
        .map((event) => ({
            image: event.image,
            title: event.title,
            date: dayjs(event.start).format("MMMM D, YYYY"),
            venue: event.venue,
        }))
        .filter((event) => event.image); // Ensure only events with images are included

    // Categorize Events
    const upcomingEvents = events.filter((event) =>
        dayjs(event.start).isAfter(today)
    );
    const ongoingEvents = events.filter((event) =>
        dayjs(event.start).isSame(today, "day")
    );
    const previousEvents = events.filter((event) =>
        dayjs(event.end).isBefore(today)
    );

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {eventImages.length > 0 ? (
                        <Carousel images={eventImages} interval={3000} />
                    ) : (
                        <p>No event images available</p>
                    )}
                    {/* Upcoming Events */}
                    <section className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            📅 Upcoming Events
                        </h3>
                        {upcomingEvents.length > 0 ? (
                            <ul className="space-y-4">
                                {upcomingEvents.map((event) => (
                                    <li
                                        key={event.id}
                                        className="p-4 border rounded-lg"
                                    >
                                        <h4 className="text-lg font-semibold">
                                            {event.title}
                                        </h4>
                                        <p className="text-gray-600">
                                            📍 {event.venue} | 🕒{" "}
                                            {dayjs(event.start).format(
                                                "MMMM D, YYYY"
                                            )}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No upcoming events.</p>
                        )}
                    </section>

                    {/* Ongoing Events */}
                    <section className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            🔥 Ongoing Events
                        </h3>
                        {ongoingEvents.length > 0 ? (
                            <ul className="space-y-4">
                                {ongoingEvents.map((event) => (
                                    <li
                                        key={event.id}
                                        className="p-4 border rounded-lg"
                                    >
                                        <h4 className="text-lg font-semibold">
                                            {event.title}
                                        </h4>
                                        <p className="text-gray-600">
                                            📍 {event.venue} | 🕒{" "}
                                            {dayjs(event.start).format(
                                                "MMMM D, YYYY"
                                            )}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No ongoing events.</p>
                        )}
                    </section>

                    {/* Previous Events */}
                    <section className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            ⏳ Previous Events
                        </h3>
                        {previousEvents.length > 0 ? (
                            <ul className="space-y-4">
                                {previousEvents.map((event) => (
                                    <li
                                        key={event.id}
                                        className="p-4 border rounded-lg"
                                    >
                                        <h4 className="text-lg font-semibold">
                                            {event.title}
                                        </h4>
                                        <p className="text-gray-600">
                                            📍 {event.venue} | 🕒{" "}
                                            {dayjs(event.end).format(
                                                "MMMM D, YYYY"
                                            )}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No previous events.</p>
                        )}
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
