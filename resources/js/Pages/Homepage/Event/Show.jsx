import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link } from "@inertiajs/react";
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function Index({ auth, event }) {
    return (
        <HomeLayout auth={auth}>
            <Head title="Posts" />
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:items-start lg:gap-y-10">
                    <div className="">
                        <div className="lg:pr-4">
                            <div className="max-w-6xl mx-auto">
                                <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {event.title}
                                </h1>
                                <div className="mt-4">
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
                                                {event.start !== event.end ? (
                                                    <>
                                                        <time
                                                            dateTime={
                                                                event.start
                                                            }
                                                        >
                                                            {event.start}
                                                        </time>{" "}
                                                        to{" "}
                                                        <time
                                                            dateTime={event.end}
                                                        >
                                                            {event.end}
                                                        </time>
                                                    </>
                                                ) : (
                                                    <time
                                                        dateTime={event.start}
                                                    >
                                                        {event.start}
                                                    </time>
                                                )}
                                            </div>
                                        </p>
                                        <span aria-hidden="true">&middot;</span>
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
                                            <time dateTime={event.start_time}>
                                                {event.start_time}
                                            </time>{" "}
                                            -{" "}
                                            <time dateTime={event.end_time}>
                                                {event.end_time}
                                            </time>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-[30rem] mt-4">
                                    <img
                                        alt=""
                                        src={`/storage/${event.image}`}
                                        className=" h-full object-cover rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 w-full"
                                    />
                                </div>

                                <p className="mt-6 text-xl/8 text-gray-700">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/*                     <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <img
                            alt=""
                            src={`/storage/${event.image}`}
                            classname="w-[48rem] h-[30rem] object-cover max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                        />
                    </div> */}
                </div>
            </div>
        </HomeLayout>
    );
}
