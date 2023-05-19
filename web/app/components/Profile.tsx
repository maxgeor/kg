import React from "react";
import Grid from "./Grid";
import ImageCarousel from "./ImageCarousel";
import { paddedNumber } from "../utils/formatting";

export default function Profile({
  index,
  name,
  wrap,
  sheath,
  imageUrls,
  showingIndex = true,
  description,
  carouselClasses = "col-span-full sm:col-span-2",
  textClasses = "col-span-full sm:col-span-2 xl:col-span-1 lg:pr-[72px]",
  className = "",
}: {
  index: number;
  name: string;
  wrap: string;
  sheath: string;
  imageUrls: string[];
  description?: string;
  showingIndex?: boolean;
  isSpecialProject?: boolean;
  carouselClasses?: string;
  textClasses?: string;
  className?: string;
}) {
  const images = imageUrls.map((url) => {
    return {
      url,
      alt: `${name} image ${index}`,
    };
  });

  return (
    <Grid gap="gap-6" className={`bg-black ${className}`}>
      <ImageCarousel
        images={images}
        className={`
          ${carouselClasses}
          relative aspect-square xl:order-last
        `}
      />
      <div
        className={`
          ${textClasses}
          flex flex-col gap-6 
        `}
      >
        <div className="flex justify-between -my-1">
          {showingIndex ? (
            <span className="mr-6">{paddedNumber(index + 1)}</span>
          ) : null}
          <h3 className="col-span-full h-min w-full">{name}</h3>
        </div>
        {description && (
          <div className="max-w-prose -my-1">{description.trim()}</div>
        )}
        <p className="-my-1">{`${wrap}, ${sheath}`}</p>
      </div>
    </Grid>
  );
}
