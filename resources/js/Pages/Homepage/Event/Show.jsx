import HomeLayout from "@/Layouts/HomeLayout";
import { Head } from "@inertiajs/react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

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
                                    <div className="flex items-center gap-1 flex-wrap">
                                        <p className="text-sm font-medium flex gap-2 items-center">
                                            📅{" "}
                                            {event.start !== event.end ? (
                                                <>
                                                    <time
                                                        dateTime={event.start}
                                                    >
                                                        {dayjs(
                                                            event.start
                                                        ).format("LL")}
                                                    </time>{" "}
                                                    to{" "}
                                                    <time dateTime={event.end}>
                                                        {dayjs(
                                                            event.end
                                                        ).format("LL")}
                                                    </time>
                                                </>
                                            ) : (
                                                <time dateTime={event.start}>
                                                    {dayjs(event.start).format(
                                                        "LL"
                                                    )}
                                                </time>
                                            )}
                                        </p>
                                        <span aria-hidden="true">&middot;</span>
                                        <p className="text-sm font-medium flex items-center gap-1">
                                            ⏰{" "}
                                            {dayjs(
                                                `2000-01-01 ${event.start_time}`
                                            ).format("h:mm A")}{" "}
                                            -{" "}
                                            {dayjs(
                                                `2000-01-01 ${event.end_time}`
                                            ).format("h:mm A")}
                                        </p>

                                        <span aria-hidden="true">&middot;</span>
                                        <p className="text-sm font-medium flex items-center gap-1">
                                            🏢 Venue: <span>{event.venue}</span>
                                        </p>

                                        <span aria-hidden="true">&middot;</span>
                                        <p className="text-sm font-medium flex items-center gap-1">
                                            🧑‍🤝‍🧑 Attendees:{" "}
                                            {event.attendees
                                                .sort((a, b) => {
                                                    const order = [
                                                        "1st Year",
                                                        "2nd Year",
                                                        "3rd Year",
                                                        "4th Year",
                                                    ];
                                                    return (
                                                        order.indexOf(a) -
                                                        order.indexOf(b)
                                                    );
                                                })
                                                .join(", ")}
                                        </p>
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
