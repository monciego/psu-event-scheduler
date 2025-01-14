import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({ postData }) {
    const [confirmingOpenModal, setConfirmingOpenModal] = useState(false);

    const confirmOpenModal = () => {
        setConfirmingOpenModal(true);
    };

    const { data, setData, post, processing, reset, errors } = useForm({
        post: postData.post || "",
        images: [],
        _method: "put",
    });

    const handleFileChange = (e) => {
        setData("images", e.target.files);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("posts.update", postData.id), {
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
                Edit post
            </PrimaryButton>

            <Modal show={confirmingOpenModal} onClose={closeModal}>
                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Edit post
                    </h2>

                    <div className="mt-4">
                        <div>
                            <InputLabel htmlFor="post" value="Post" />
                            <textarea
                                id="post"
                                value={data.post}
                                placeholder="Create a post"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={(e) =>
                                    setData("post", e.target.value)
                                }
                            ></textarea>
                            <InputError
                                message={errors.post}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="images" value="Images" />
                            <input
                                className="mt-1"
                                type="file"
                                id="images"
                                multiple
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>

                        <InputError message={errors.images} className="mt-2" />
                    </div>

                    <div className="mt-6 flex  gap-4 justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton disabled={processing}>
                            Post
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
