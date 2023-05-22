import React, { useState } from "react";
import Image from "next/image";
import ChevronCircleLeft from "./icons/ChevronCircleLeft";
import ChevronCircleRight from "./icons/ChevronCircleRight";
import { motion, AnimatePresence } from "framer-motion";

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
  const focusedImage = images[focusedImageIndex];
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
        w-full overflow-hidden
        ${className}
      `}
    >
      <AnimatePresence key={focusedImage.url}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          exit={{ opacity: 0, x: -100 }}
          className="w-full"
        >
          <Image
            src={focusedImage.url}
            alt={focusedImage.alt}
            width={1000}
            height={1000}
            className="max-w-full w-full object-cover aspect-square"
            priority
          />
        </motion.div>
      </AnimatePresence>
      <button
        className={`
          ${focusedImageIndex === 0 ? "hidden" : null}
          group z-20 shrink-0 absolute top-0 bottom-0 left-0 px-2
        `}
        onClick={prev}
      >
        <ChevronCircleLeft className="opacity-[75%] group-hover:opacity-100 group-active:opacity-75 transition" />
      </button>
      <button
        className={`
          ${focusedImageIndex + 1 === numberOfImages ? "hidden" : null}
          group z-20 shrink-0 absolute top-0 bottom-0 right-0 px-2
        `}
        onClick={next}
      >
        <ChevronCircleRight className="opacity-[75%] group-hover:opacity-100 group-active:opacity-75 transition" />
      </button>
    </div>
  );
}
