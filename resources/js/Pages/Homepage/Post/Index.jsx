import HomeLayout from "@/Layouts/HomeLayout";
import { Head } from "@inertiajs/react";
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function Index({ auth, posts }) {
    const updatedPosts = posts.map((post) => {
        return {
            ...post,
            images: JSON.parse(post.images), // Convert images string to array
        };
    });
    return (
        <HomeLayout auth={auth}>
            <Head title="Posts" />
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
                    {updatedPosts.map((post) => (
                        <div
                            key={post.id}
                            className="flex flex-col rounded-lg shadow-lg overflow-hidden p-6 bg-white"
                        >
                            <div className=" flex items-center">
                                <div className="flex-shrink-0">
                                    <div>
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src="https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-base font-medium text-gray-900">
                                        <h3>{post.user.name}</h3>
                                    </p>
                                    <div className="flex space-x-1 text-sm text-gray-500">
                                        <time dateTime={post.created_at}>
                                            {post.created_at}
                                        </time>
                                        <span aria-hidden="true">&middot;</span>
                                        <span>8:00am</span>
                                    </div>
                                </div>
                            </div>

                            <div className="my-4">
                                <p className="text-base text-gray-500">
                                    {post.post}
                                </p>
                            </div>
                            <div className="flex-shrink-0 cursor-pointer">
                                <PhotoProvider maskOpacity={0.9}>
                                    {post.images.map((item, index) => (
                                        <PhotoView
                                            key={index}
                                            src={`/storage/${item}`}
                                        >
                                            <div className="relative group">
                                                {/* Image with hover darken effect */}

                                                {index < 1 ? (
                                                    <img
                                                        className="h-72 w-full object-cover rounded transition-all duration-300 group-hover:opacity-70"
                                                        src={`/storage/${item}`}
                                                        alt=""
                                                    />
                                                ) : undefined}

                                                {/* "Show More" button in the center of the image */}
                                                {index < 1 && (
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <button className="bg-black text-white px-4 py-2 rounded-full text-lg">
                                                            Show More
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </PhotoView>
                                    ))}
                                </PhotoProvider>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}
