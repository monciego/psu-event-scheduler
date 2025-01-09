import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Head, Link } from "@inertiajs/react";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useState } from "react";
import Modal from "@/Components/Modal";

export default function Index({ events }) {
    const [confirmingOpenModal, setConfirmingOpenModal] = useState(false);

    // Add dynamic backgroundColor
    const data = events.map((event) => ({
        ...event,
        /*             backgroundColor: event.type === "meeting" ? "#ff0000" : "#00ff00",  */
        backgroundColor: "red",
    }));

    console.log(data);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const handleEventClick = (info) => {
        setSelectedEvent({
            id: info.event.id,
            title: info.event.title,
            date: info.event.start.toISOString().split("T")[0], // Format date as YYYY-MM-DD
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
        <AuthenticatedLayout>
            <Head title="Calendar" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="my-10">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={data}
                        eventClick={handleEventClick} // Add the eventClick handler here
                    />

                    <Modal show={confirmingOpenModal} onClose={closeModal}>
                        {selectedEvent && (
                            <div>
                                <p>
                                    <strong>Title:</strong>{" "}
                                    {selectedEvent.title}
                                </p>
                                <p>
                                    <strong>Date:</strong> {selectedEvent.date}
                                </p>

                                <Link
                                    href={route(
                                        "events.show",
                                        selectedEvent.id
                                    )}
                                >
                                    View Details
                                </Link>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
