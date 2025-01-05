import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Create from "./Create";
import { PhotoProvider, PhotoView } from "react-photo-view";

const example = [
    {
        title: "Boost your conversion rate",
        href: "#",
        category: { name: "Article", href: "#" },
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
        date: "Mar 16, 2020",
        datetime: "2020-03-16",
        imageUrl:
            "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
        readingTime: "6 min",
        author: {
            name: "Roel Aufderehar",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
    {
        title: "How to use search engine optimization to drive sales",
        href: "#",
        category: { name: "Video", href: "#" },
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.",
        date: "Mar 10, 2020",
        datetime: "2020-03-10",
        imageUrl:
            "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
        readingTime: "4 min",
        author: {
            name: "Brenna Goyette",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
    {
        title: "Improve your customer experience",
        href: "#",
        category: { name: "Case Study", href: "#" },
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
        date: "Feb 12, 2020",
        datetime: "2020-02-12",
        imageUrl:
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
        readingTime: "11 min",
        author: {
            name: "Daniela Metz",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
];

export default function Index({ posts }) {
    const updatedPosts = posts.map((post) => {
        return {
            ...post,
            images: JSON.parse(post.images), // Convert images string to array
        };
    });

    return (
        <AuthenticatedLayout>
            <Head title="Posts" />

            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="flex items-center justify-between mb-10">
                    <h3 className="font-medium text-2xl">Posts</h3>
                    <Create />
                </header>

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
                                        <h3>Supreme Student Council</h3>
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
        </AuthenticatedLayout>
    );
}
