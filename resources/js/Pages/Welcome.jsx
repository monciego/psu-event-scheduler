import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link } from "@inertiajs/react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

/* This example requires Tailwind CSS v2.0+ */
const posts = [
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

export default function Welcome({ auth, events }) {
    return (
        <HomeLayout auth={auth}>
            <Head title="Home" />
            <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
                <div className="absolute inset-0">
                    <div className="bg-white h-1/3 sm:h-2/3" />
                </div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                            CouncilSync
                        </h2>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Innovating Event Scheduling for the Supreme Student
                            Council
                        </p>
                    </div>
                    <div className=" mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none mt-4">
                        {events.map((event) => (
                            <div>
                                <Link
                                    href={route("event.home.show", event.id)}
                                    key={event.id}
                                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-72 w-full object-cover"
                                            src={`/storage/${event.image}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4">
                                                <p className="text-sm font-medium flex gap-2 items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                                        />
                                                    </svg>
                                                    <div>
                                                        {event.start !==
                                                        event.end ? (
                                                            <>
                                                                <time
                                                                    dateTime={
                                                                        event.start
                                                                    }
                                                                >
                                                                    {dayjs(
                                                                        event.start
                                                                    ).format(
                                                                        "LL"
                                                                    )}
                                                                </time>{" "}
                                                                to{" "}
                                                                <time
                                                                    dateTime={
                                                                        event.end
                                                                    }
                                                                >
                                                                    {dayjs(
                                                                        event.end
                                                                    ).format(
                                                                        "LL"
                                                                    )}
                                                                </time>
                                                            </>
                                                        ) : (
                                                            <time
                                                                dateTime={
                                                                    event.start
                                                                }
                                                            >
                                                                {dayjs(
                                                                    event.start
                                                                ).format("LL")}
                                                            </time>
                                                        )}
                                                    </div>
                                                </p>
                                                <span aria-hidden="true">
                                                    &middot;
                                                </span>
                                                <div className="flex gap-2 items-center text-sm font-medium">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                    <time
                                                        dateTime={
                                                            event.start_time
                                                        }
                                                    >
                                                        {dayjs(
                                                            `2000-01-01 ${event.start_time}`
                                                        ).format("h:mm A")}
                                                    </time>{" "}
                                                    -{" "}
                                                    <time
                                                        dateTime={
                                                            event.end_time
                                                        }
                                                    >
                                                        {dayjs(
                                                            `2000-01-01 ${event.end_time}`
                                                        ).format("h:mm A")}
                                                    </time>
                                                </div>
                                            </div>
                                            <div className="block mt-2">
                                                <p className="text-xl font-semibold text-gray-900">
                                                    {event.title}
                                                </p>
                                                <p className="mt-3 text-base text-gray-500 line-clamp-3">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center">
                                            <div className="flex-shrink-0">
                                                <h3>
                                                    <span className="sr-only">
                                                        {event.user.name}
                                                    </span>
                                                    <img
                                                        className="h-7 w-7 rounded-full"
                                                        src="https://upload.wikimedia.org/wikipedia/en/7/75/Pangasinan_State_University_logo.png"
                                                        alt=""
                                                    />
                                                </h3>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-base font-medium text-gray-900">
                                                    {event.user.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
