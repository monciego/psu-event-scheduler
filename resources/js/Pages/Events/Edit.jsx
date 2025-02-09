import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const venueOptions = [
    "Covered Court",
    "Atrium",
    "AVR",
    "PBB Ground",
    "BCRD Ground",
    "Student Center",
    "Other",
];

export default function Edit({ eventData }) {
    const [confirmingOpenModal, setConfirmingOpenModal] = useState(false);

    const confirmOpenModal = () => {
        setConfirmingOpenModal(true);
    };

    console.log(eventData.attendees.includes("1st Year"));

    const { data, setData, post, processing, reset, errors } = useForm({
        title: eventData.title || "",
        description: eventData.description || "",
        venue: eventData.venue || "",
        start: eventData.start || "",
        end: eventData.end || "",
        start_time: eventData.start_time || "",
        end_time: eventData.end_time || "",
        image: "",
        attendees: Array.isArray(eventData.attendees)
            ? [...eventData.attendees]
            : [],
        _method: "put",
    });

    const [isOther, setIsOther] = useState(
        event.venue && !venueOptions.includes(event.venue)
    );

    useEffect(() => {
        setIsOther(event.venue && !venueOptions.includes(event.venue));
    }, [event.venue]);

    const handleVenueChange = (e) => {
        const value = e.target.value;
        if (value === "Other") {
            setIsOther(true);
            setData("venue", "");
        } else {
            setIsOther(false);
            setData("venue", value);
        }
    };

    // Ensure data.attendees updates when eventData.attendees changes
    useEffect(() => {
        setData(
            "attendees",
            Array.isArray(eventData.attendees) ? [...eventData.attendees] : []
        );
    }, [eventData.attendees]);

    const handleFileChange = (e) => {
        setData("image", e.target.files[0]);
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setData(
            "attendees",
            checked
                ? [...data.attendees, value] // Add if checked
                : data.attendees.filter((attendee) => attendee !== value) // Remove if unchecked
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("events.update", eventData.id), {
            onSuccess: () => setConfirmingOpenModal(false),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingOpenModal(false);
    };
    return (
        <>
            <PrimaryButton
                onClick={confirmOpenModal}
                className="bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-500"
            >
                Edit Event
            </PrimaryButton>

            <Modal show={confirmingOpenModal} onClose={closeModal}>
                <form
                    onSubmit={submit}
                    className="p-6  max-h-[40rem] overflow-y-scroll"
                >
                    <h2 className="text-lg font-medium text-gray-900">
                        Edit Event
                    </h2>

                    <div className="mt-4">
                        <div>
                            <InputLabel htmlFor="image" value="Image" />
                            <input
                                className="mt-1"
                                type="file"
                                id="image"
                                onChange={handleFileChange}
                                accept="image/*"
                            />

                            <InputError
                                message={errors.image}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="title" value="Event name" />

                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="event-name"
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="title" value="Event Name" />
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="venue" value="Event Venue" />
                            <select
                                id="venue"
                                name="venue"
                                value={isOther ? "Other" : data.venue}
                                onChange={handleVenueChange}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            >
                                <option value="">Select Venue</option>
                                {venueOptions.map((venue, index) => (
                                    <option key={index} value={venue}>
                                        {venue}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.venue}
                                className="mt-2"
                            />

                            {isOther && (
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="other_venue"
                                        value="Other Venue"
                                    />
                                    <TextInput
                                        id="other_venue"
                                        type="text"
                                        name="other_venue"
                                        value={data.venue}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("venue", e.target.value)
                                        }
                                        placeholder="Enter venue name"
                                    />
                                    <InputError
                                        message={errors.venue}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />
                            <textarea
                                id="description"
                                value={data.description}
                                placeholder="Description"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            ></textarea>
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-full">
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="start"
                                        value="Event Start Date"
                                    />

                                    <TextInput
                                        id="start"
                                        type="date"
                                        name="start"
                                        value={data.start}
                                        className="mt-1 block w-full"
                                        autoComplete="event-start-date"
                                        onChange={(e) =>
                                            setData("start", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.start}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="end"
                                        value="Event End Date"
                                    />

                                    <TextInput
                                        id="end"
                                        type="date"
                                        name="end"
                                        value={data.end}
                                        className="mt-1 block w-full"
                                        autoComplete="event-end-date"
                                        onChange={(e) =>
                                            setData("end", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.end}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-full mt-4">
                                <InputLabel
                                    htmlFor="start_time"
                                    value="Event Start time"
                                />

                                <TextInput
                                    id="start_time"
                                    type="time"
                                    name="start_time"
                                    value={data.start_time}
                                    className="mt-1 block w-full"
                                    autoComplete="event-time"
                                    onChange={(e) =>
                                        setData("start_time", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.start_time}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full mt-4">
                                <InputLabel
                                    htmlFor="end_time"
                                    value="Event End time"
                                />

                                <TextInput
                                    id="end_time"
                                    type="time"
                                    name="end_time"
                                    value={data.end_time}
                                    className="mt-1 block w-full"
                                    autoComplete="event-time"
                                    onChange={(e) =>
                                        setData("end_time", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.end_time}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <InputLabel value="Attendees" />
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    "1st Year",
                                    "2nd Year",
                                    "3rd Year",
                                    "4th Year",
                                ].map((year, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            value={year}
                                            checked={data.attendees.includes(
                                                year
                                            )}
                                            onChange={handleCheckboxChange}
                                            className="form-checkbox text-indigo-600"
                                        />
                                        {year}
                                    </label>
                                ))}
                            </div>
                            <InputError
                                message={errors.attendees}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex  gap-4 justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton disabled={processing}>
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
