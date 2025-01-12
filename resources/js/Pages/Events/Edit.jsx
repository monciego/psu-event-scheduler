import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({ eventData }) {
    const [confirmingOpenModal, setConfirmingOpenModal] = useState(false);

    const confirmOpenModal = () => {
        setConfirmingOpenModal(true);
    };

    const { data, setData, post, processing, reset, errors } = useForm({
        title: eventData.title || "",
        description: eventData.description || "",
        start: eventData.start || "",
        end: eventData.end || "",
        start_time: eventData.start_time || "",
        end_time: eventData.end_time || "",
        image: "",
        _method: "put",
    });

    const handleFileChange = (e) => {
        setData("image", e.target.files[0]);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("events.update", eventData.id), {
            onSuccess: () => reset(),
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
                <form onSubmit={submit} className="p-6">
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
