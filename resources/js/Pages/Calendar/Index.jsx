import Modal from "@/Components/Modal";
import HomeLayout from "@/Layouts/HomeLayout";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FullCalendar from "@fullcalendar/react";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

export default function Index({ auth, events }) {
    const [confirmingOpenModal, setConfirmingOpenModal] = useState(false);

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

    const x = events.map((event) => {
        console.log(event.user.id);
        console.log(colorMap[event.user.id]);
    });

    const data = events.map((event) => ({
        ...event,
        backgroundColor: colorMap[event.user.id] || "default-color", // Fallback to a default color
    }));

    console.log(data);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const handleEventClick = (info) => {
        console.log(info.event);
        setSelectedEvent({
            id: info.event.id,
            title: info.event.title,
            description: info.event.extendedProps.description,
            start: info.event.start ? info.event.start.toISOString() : null, // Start date and time
            end: info.event.end ? info.event.end.toISOString() : null, // End date and time (if available)
            start_time: info.event.extendedProps.start_time,
            end_time: info.event.extendedProps.end_time,
        });
        /*         alert(`Event clicked: ${info.event.title}`); */
        confirmOpenModal();

        // Uncomment below to redirect to a link stored in event's extendedProps
        /*         window.location.href = info.event.extendedProps.url; */
    };

    const confirmOpenModal = () => {
        setConfirmingOpenModal(true);
    };

    const closeModal = () => {
        setConfirmingOpenModal(false);
    };
    return (
        <HomeLayout auth={auth}>
            <Head title="Calendar" />
            <div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="my-10">
                        <div className="flex items-center gap-6 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-slate-600 h-6 w-6 rounded-full"></div>
                                <span>Admin</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-indigo-800 h-6 w-6 rounded-full"></div>
                                <span>DOIT</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-blue-400 h-6 w-6 rounded-full"></div>
                                <span>CS</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-green-600 h-6 w-6 rounded-full"></div>
                                <span>Prime</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-amber-700 h-6 w-6 rounded-full"></div>
                                <span>TAGNAWA</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-pink-600 h-6 w-6 rounded-full"></div>
                                <span>SAHARA</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-yellow-600 h-6 w-6 rounded-full"></div>
                                <span>SYBA</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-orange-600 h-6 w-6 rounded-full"></div>
                                <span>GEG</span>
                            </div>
                        </div>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={data}
                            eventClick={handleEventClick} // Add the eventClick handler here
                        />

                        <Modal show={confirmingOpenModal} onClose={closeModal}>
                            {selectedEvent && (
                                <>
                                    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div class="sm:flex sm:items-start">
                                            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3
                                                    class="text-base font-semibold text-gray-900"
                                                    id="modal-title"
                                                >
                                                    {selectedEvent.title}
                                                </h3>
                                                <div className="mt-4">
                                                    <div className="flex items-center gap-1">
                                                        <p className="text-sm font-medium flex gap-2 items-center">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
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
                                                                {selectedEvent.start !==
                                                                selectedEvent.end ? (
                                                                    <>
                                                                        <time
                                                                            dateTime={
                                                                                selectedEvent.start
                                                                            }
                                                                        >
                                                                            {dayjs(
                                                                                selectedEvent.start
                                                                            ).format(
                                                                                "LL"
                                                                            )}
                                                                        </time>{" "}
                                                                        to{" "}
                                                                        <time
                                                                            dateTime={
                                                                                selectedEvent.end
                                                                            }
                                                                        >
                                                                            {dayjs(
                                                                                selectedEvent.end
                                                                            ).format(
                                                                                "LL"
                                                                            )}
                                                                        </time>
                                                                    </>
                                                                ) : (
                                                                    <time
                                                                        dateTime={
                                                                            selectedEvent.start
                                                                        }
                                                                    >
                                                                        {dayjs(
                                                                            selectedEvent.start
                                                                        ).format(
                                                                            "LL"
                                                                        )}
                                                                    </time>
                                                                )}
                                                            </div>{" "}
                                                        </p>
                                                        <span aria-hidden="true">
                                                            &middot;
                                                        </span>
                                                        <div className="flex gap-2 items-center text-sm font-medium">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
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
                                                                dateTime={
                                                                    selectedEvent.start_time
                                                                }
                                                            >
                                                                {
                                                                    selectedEvent.start_time
                                                                }
                                                            </time>{" "}
                                                            -{" "}
                                                            <time
                                                                dateTime={
                                                                    selectedEvent.end_time
                                                                }
                                                            >
                                                                {
                                                                    selectedEvent.end_time
                                                                }
                                                            </time>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <p class="text-sm text-gray-500 line-clamp-3">
                                                        {
                                                            selectedEvent.description
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <Link
                                            href={route(
                                                "event.home.show",
                                                selectedEvent.id
                                            )}
                                            class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                        >
                                            Details
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>

                                /*
                                <div>
                                    <p>
                                        <strong>Title:</strong>{" "}
                                        {selectedEvent.title}
                                    </p>
                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {selectedEvent.date}
                                    </p>

                                    <Link
                                        href={route(
                                            "events.show",
                                            selectedEvent.id
                                        )}
                                    >
                                        View Details
                                    </Link>
                                </div> */
                            )}
                        </Modal>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
