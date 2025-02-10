import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function Delete({ eventData }) {
    const [confirmingOpenModal, setConfirmingOpenModal] = useState(false);

    const confirmOpenModal = () => {
        setConfirmingOpenModal(true);
    };

    const closeModal = () => {
        setConfirmingOpenModal(false);
    };
    return (
        <>
            <PrimaryButton
                onClick={confirmOpenModal}
                className="bg-red-600 hover:bg-red-500 focus:bg-red-500 active:bg-red-500"
            >
                Delete
            </PrimaryButton>

            <Modal show={confirmingOpenModal} onClose={closeModal}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                            <ExclamationTriangleIcon
                                aria-hidden="true"
                                className="size-6 text-red-600"
                            />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <DialogTitle
                                as="h3"
                                className="text-base font-semibold text-gray-900"
                            >
                                Delete Event
                            </DialogTitle>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete this event?
                                    Your data will be permanently removed. This
                                    action cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Link
                        href={route("events.destroy", eventData.id)}
                        method="delete"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                        Delete
                    </Link>
                    <button
                        type="button"
                        data-autofocus
                        onClick={closeModal}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
}
