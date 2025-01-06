import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth }) {
    const [confirmingOpenModal, setConfirmingOpenModal] = useState(false);

    const confirmOpenModal = () => {
        setConfirmingOpenModal(true);
    };

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        description: "",
        date: "",
        start_time: "",
        end_time: "",
        image: "",
    });

    const handleFileChange = (e) => {
        setData("image", e.target.files[0]);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("events.store"), { onSuccess: () => reset() });
    };

    const closeModal = () => {
        setConfirmingOpenModal(false);
    };
    return (
        <>
            <PrimaryButton onClick={confirmOpenModal}>
                Create Event
            </PrimaryButton>

            <Modal show={confirmingOpenModal} onClose={closeModal}>
                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Create Event
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
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Event name" />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="event-name"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.name}
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

                        <div className="mt-4">
                            <InputLabel htmlFor="date" value="Event Date" />

                            <TextInput
                                id="date"
                                type="date"
                                name="date"
                                value={data.date}
                                className="mt-1 block w-full"
                                autoComplete="event-date"
                                onChange={(e) =>
                                    setData("date", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.date}
                                className="mt-2"
                            />
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
