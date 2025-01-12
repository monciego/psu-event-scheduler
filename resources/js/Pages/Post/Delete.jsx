import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function Delete({ postData }) {
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
                <Link
                    href={route("posts.destroy", postData.id)}
                    method="delete"
                >
                    Delete
                </Link>
            </Modal>
        </>
    );
}
