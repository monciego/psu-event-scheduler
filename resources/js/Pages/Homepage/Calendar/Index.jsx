import Modal from "@/Components/Modal";
import HomeLayout from "@/Layouts/HomeLayout";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

export default function Index({ auth, events }) {
    const [confirmingOpenModal, setConfirmingOpenModal] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const colorMap = {
        1: "#64748b", // bg-slate-600
        2: "#3730a3", // bg-indigo-800
        3: "#60a5fa", // bg-blue-400
        4: "#16a34a", // bg-green-600
        5: "#d97706", // bg-amber-700
        6: "#db2777", // bg-pink-600
        7: "#facc15", // bg-yellow-600
        8: "#ea580c", // bg-orange-600
    };

    const colorMappedEvents = events.map((event) => ({
        ...event,
        backgroundColor: colorMap[event.user.id] || "default-color", // Fallback to a default color
    }));

    const handleEventClick = (info) => {
        setSelectedEvent({
            id: info.event.id,
            title: info.event.title,
            description: info.event.extendedProps.description,
            start: info.event.start ? info.event.start.toISOString() : null,
            end: info.event.end ? info.event.end.toISOString() : null,
            start_time: info.event.extendedProps.start_time,
            end_time: info.event.extendedProps.end_time,
        });
        confirmOpenModal();
    };

    const confirmOpenModal = () => {
        setConfirmingOpenModal(true);
    };

    const closeModal = () => {
        setConfirmingOpenModal(false);
    };

    // Filter events based on selected user ID
    const filterEvents = (filterId) => {
        if (filterId === "all") {
            // Show all events
            setFilteredEvents(events);
        } else {
            // Filter events based on the filterId (e.g., event type)
            const filtered = events.filter(
                (event) => event.user.id === filterId
            );
            setFilteredEvents(filtered);
        }
    };

    return (
        <HomeLayout auth={auth}>
            <Head title="Calendar" />
            <div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="my-10">
                        <div className="flex items-center gap-6 mb-4 flex-wrap">
                            Filter:
                            <button
                                onClick={() => filterEvents("all")} // Show All
                                className="flex items-center gap-2"
                            >
                                <div className="bg-gray-500 h-6 w-6 rounded-full"></div>
                                <span>Show All</span>
                            </button>
                            <button
                                onClick={() => filterEvents(1)}
                                className="flex items-center gap-2"
                            >
                                <div className="bg-slate-600 h-6 w-6 rounded-full"></div>
                                <span>SSC</span>
                            </button>
                            <button
                                onClick={() => filterEvents(2)}
                                className="flex items-center gap-2"
                            >
                                <div className="bg-indigo-800 h-6 w-6 rounded-full"></div>
                                <span>DOIT</span>
                            </button>
                            <button
                                onClick={() => filterEvents(3)}
                                className="flex items-center gap-2"
                            >
                                <div className="bg-blue-400 h-6 w-6 rounded-full"></div>
                                <span>CS</span>
                            </button>
                            <button
                                onClick={() => filterEvents(4)}
                                className="flex items-center gap-2"
                            >
                                <div className="bg-green-600 h-6 w-6 rounded-full"></div>
                                <span>Prime</span>
                            </button>
                            <button
                                onClick={() => filterEvents(5)}
                                className="flex items-center gap-2"
                            >
                                <div className="bg-amber-700 h-6 w-6 rounded-full"></div>
                                <span>TAGNAWA</span>
                            </button>
                            <button
                                onClick={() => filterEvents(6)}
                                className="flex items-center gap-2"
                            >
                                <div className="bg-pink-600 h-6 w-6 rounded-full"></div>
                                <span>SAHARA</span>
                            </button>
                            <button
                                onClick={() => filterEvents(7)}
                                className="flex items-center gap-2"
                            >
                                <div className="bg-yellow-600 h-6 w-6 rounded-full"></div>
                                <span>SYBA</span>
                            </button>
                            <button
                                onClick={() => filterEvents(8)}
                                className="flex items-center gap-2"
                            >
                                <div className="bg-orange-600 h-6 w-6 rounded-full"></div>
                                <span>GEG</span>
                            </button>
                        </div>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={filteredEvents.map((event) => ({
                                ...event,
                                backgroundColor:
                                    colorMap[event.user.id] || "default-color",
                            }))}
                            eventClick={handleEventClick} // Add the eventClick handler here
                        />

                        <Modal show={confirmingOpenModal} onClose={closeModal}>
                            {selectedEvent && (
                                <>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3
                                                    className="text-base font-semibold text-gray-900"
                                                    id="modal-title"
                                                >
                                                    {selectedEvent.title}
                                                </h3>
                                                <div className="mt-4">
                                                    <p className="text-sm font-medium">
                                                        <time
                                                            dateTime={
                                                                selectedEvent.start
                                                            }
                                                        >
                                                            {dayjs(
                                                                selectedEvent.start
                                                            ).format("LL")}
                                                        </time>{" "}
                                                        to{" "}
                                                        <time
                                                            dateTime={
                                                                selectedEvent.end
                                                            }
                                                        >
                                                            {dayjs(
                                                                selectedEvent.end
                                                            ).format("LL")}
                                                        </time>
                                                    </p>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500 line-clamp-3">
                                                            {
                                                                selectedEvent.description
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <Link
                                            href={route(
                                                "event.home.show",
                                                selectedEvent.id
                                            )}
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                        >
                                            Details
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            )}
                        </Modal>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
