import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

export default function Show({ event }) {
    return (
        <AuthenticatedLayout>
            <div className="relative isolate overflow-hidden  px-6 py-16 lg:overflow-visible lg:px-0">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <svg
                        aria-hidden="true"
                        className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                    >
                        <defs>
                            <pattern
                                x="50%"
                                y={-1}
                                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                                width={200}
                                height={200}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M100 200V.5M.5 .5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg
                            x="50%"
                            y={-1}
                            className="overflow-visible fill-gray-100"
                        >
                            <path
                                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect
                            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
                            width="100%"
                            height="100%"
                            strokeWidth={0}
                        />
                    </svg>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:items-start lg:gap-y-10">
                    <div className="">
                        <div className="lg:pr-4">
                            <div className="max-w-6xl mx-auto">
                                <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {event.title}
                                </h1>
                                <div className="mt-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-1 flex-wrap">
                                            <p className="text-sm font-medium flex gap-2 items-center">
                                                📅{" "}
                                                {event.start !== event.end ? (
                                                    <>
                                                        <time
                                                            dateTime={
                                                                event.start
                                                            }
                                                        >
                                                            {dayjs(
                                                                event.start
                                                            ).format("LL")}
                                                        </time>{" "}
                                                        to{" "}
                                                        <time
                                                            dateTime={event.end}
                                                        >
                                                            {dayjs(
                                                                event.end
                                                            ).format("LL")}
                                                        </time>
                                                    </>
                                                ) : (
                                                    <time
                                                        dateTime={event.start}
                                                    >
                                                        {dayjs(
                                                            event.start
                                                        ).format("LL")}
                                                    </time>
                                                )}
                                            </p>
                                            <span aria-hidden="true">
                                                &middot;
                                            </span>
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

                                            <span aria-hidden="true">
                                                &middot;
                                            </span>
                                            <p className="text-sm font-medium flex items-center gap-1">
                                                🏢 Venue:{" "}
                                                <span>{event.venue}</span>
                                            </p>

                                            <span aria-hidden="true">
                                                &middot;
                                            </span>
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
        </AuthenticatedLayout>
    );
}
