import React from "react";

export default function Carousel({ images, interval }) {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval]);

    return (
        <div className="relative w-full h-[20rem]">
            {images.map((event, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={`/storage/${event.image}`}
                        alt={event.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    {/* Caption */}
                    <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-4 text-center">
                        <h3 className="text-lg font-bold">{event.title}</h3>
                        <p className="text-sm">
                            {event.date} • {event.venue}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
