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
        className="md:order-last col-span-full md:col-span-2 relative aspect-square"
      />
      <div className="col-span-full md:col-span-1 flex flex-col gap-6">
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
    // <Grid gap="gap-6" className={`bg-black ${className}`}>
    //   <ImageCarousel
    //     images={images}
    //     className="md:order-last col-span-full md:col-span-2 lg:col-span-3 relative"
    //   />
    //   <div className="col-span-full md:col-span-1 flex flex-col gap-6">
    //     <div className="flex justify-between">
    //       <span className="mr-6">{paddedNumber(index)}</span>
    //       <h3 className="col-span-full h-min w-full">{name}</h3>
    //     </div>
    //     {description && (
    //       <div className="max-w-prose -my-1">{description.trim()}</div>
    //     )}
    //     <p>{`${wrap}, ${sheath}`}</p>
    //   </div>
    // </Grid>
  );
}
