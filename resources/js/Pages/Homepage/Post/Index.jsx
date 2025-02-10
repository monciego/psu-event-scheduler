import HomeLayout from "@/Layouts/HomeLayout";
import { Head } from "@inertiajs/react";
import { PhotoProvider, PhotoView } from "react-photo-view";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useState } from "react";

dayjs.extend(LocalizedFormat);

export default function Index({ auth, posts }) {
    const [filter, setFilter] = useState(""); // Filter by user
    const [searchQuery, setSearchQuery] = useState(""); // Search by post content

    const [updatedPosts] = useState(() =>
        posts.map((post) => ({
            ...post,
            images: JSON.parse(post.images), // Parse images from string to array
        }))
    );

    const filteredPosts = updatedPosts.filter((post) => {
        const matchesUser = !filter || post.user.id === Number(filter);
        const matchesSearch =
            !searchQuery ||
            post.post.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesUser && matchesSearch;
    });

    return (
        <HomeLayout auth={auth}>
            <Head title="Posts" />
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* User Filter */}
                    <div>
                        <label
                            htmlFor="filter"
                            className="mr-2 text-gray-700 font-medium"
                        >
                            Filter by User:
                        </label>
                        <select
                            id="filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border rounded px-3 py-2"
                        >
                            <option value="">All Users</option>
                            {[
                                ...new Map(
                                    updatedPosts.map((post) => [
                                        post.user.id,
                                        post.user.name,
                                    ]) // Create a unique map of user IDs and names
                                ).entries(),
                            ].map(([userId, userName], index) => (
                                <option key={index} value={userId}>
                                    {userName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search Bar */}
                    <div>
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border rounded px-3 py-2 w-full sm:w-64"
                        />
                    </div>
                </div>

                <div className="max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                className="flex flex-col rounded-lg shadow-lg overflow-hidden p-6 bg-white"
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src="https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-base font-medium text-gray-900">
                                            {post.user.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Posted by{" "}
                                            <span className="capitalize">
                                                {post.author}
                                            </span>
                                        </p>
                                        <div className="flex space-x-1 text-sm text-gray-500">
                                            <time dateTime={post.created_at}>
                                                {dayjs(post.created_at).format(
                                                    "LL"
                                                )}
                                            </time>
                                            <span aria-hidden="true">
                                                &middot;
                                            </span>
                                            <span>
                                                {dayjs(post.created_at).format(
                                                    "hh:mm A"
                                                )}
                                            </span>
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
                                                    {index < 1 ? (
                                                        <img
                                                            className="h-72 w-full object-cover rounded transition-all duration-300 group-hover:opacity-70"
                                                            src={`/storage/${item}`}
                                                            alt=""
                                                        />
                                                    ) : null}

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
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-2">
                            No posts found.
                        </p>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}
