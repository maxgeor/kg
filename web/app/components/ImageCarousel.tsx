import React, { useState } from "react";
import Image from "next/image";
import ChevronCircleLeft from "./icons/ChevronCircleLeft";
import ChevronCircleRight from "./icons/ChevronCircleRight";

interface Image {
  url: string;
  alt: string;
}

export default function ImageCarousel({
  images,
  className,
}: {
  images: Image[];
  className?: string;
}) {
  const [focusedImageIndex, setFocusedImageIndex] = useState(0);
  const numberOfImages = images.length;

  const prev = () =>
    setFocusedImageIndex(
      (prevIndex) => (prevIndex - 1 + numberOfImages) % numberOfImages
    );

  const next = () =>
    setFocusedImageIndex((prevIndex) => (prevIndex + 1) % numberOfImages);

  return (
    <div
      className={`
      flex overflow-x-hidden w-full ratio-square
      ${className}
    `}
    >
      {images.map((image: Image, index: number) => (
        <Image
          key={image.url}
          src={image.url}
          alt={image.alt}
          width={1000}
          height={1000}
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover",
            aspectRatio: "1/1",
            transform: `translateX(-${focusedImageIndex * 100}%)`,
          }}
          priority
        />
      ))}
      <button
        className="z-20 shrink-0 opacity-[80%] hover:opacity-100 transition absolute top-1/2 left-2 transform -translate-y-1/2"
        onClick={prev}
      >
        <ChevronCircleLeft />
      </button>
      <button
        className="z-20 shrink-0 opacity-[80%] hover:opacity-100 transition absolute top-1/2 right-2 transform -translate-y-1/2"
        onClick={next}
      >
        <ChevronCircleRight />
      </button>
    </div>
  );
}
