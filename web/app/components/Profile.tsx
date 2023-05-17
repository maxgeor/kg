import React from "react";
import Grid from "./Grid";
import Image from "next/image";
import ImageCarousel from "./ImageCarousel";
import ChevronCircleLeft from "./icons/ChevronCircleLeft";
import ChevronCircleRight from "./icons/ChevronCircleRight";
import { paddedNumber } from "../utils/formatting";

export default function Profile({
  name,
  wrap,
  sheath,
  imageUrls,
  index,
  description,
  descriptionSpan = "col-span-full",
  cols = { mobile: 4, desktop: 4 },
  isSpecialProject = false,
  isShowingIndex = false,
  className = "",
}: {
  name: string;
  wrap: string;
  sheath: string;
  imageUrls: string[];
  index?: number;
  description?: string;
  descriptionSpan?: "col-span-full" | "col-span-full lg:col-span-1";
  isSpecialProject?: boolean;
  isShowingIndex?: boolean;
  cols?: { mobile: 3 | 4; desktop: 3 | 4 };
  className?: string;
}) {
  const images = imageUrls.map((url) => {
    return {
      url,
      alt: `${name} image ${index}`,
    };
  });

  return (
    <Grid
      // cols={`grid-cols-${cols.mobile} lg:grid-cols-${cols.desktop}`}
      gap="gap-y-4 gap-x-6 sm:gap-6"
      className={`bg-black ${className}`}
    >
      {/* <h3 className="sm:hidden text-md leading-5 col-span-full text-right pt-1 border-t-2 border-white pl-16">
        {name}
      </h3> */}
      {/* {isShowingIndex ? (
        <span className="hidden lg:block font-mono text-lg">
          {paddedNumber(index)}
        </span>
      ) : null} */}

      {/* <div
        className={`
        col-span-full sm:col-span-2 relative h-fit
        ${cols.desktop === 3 || isShowingIndex ? "lg:col-span-1" : null}
      `}
      >
        {imageUrls.map((url, index) => (
          <Image
            key={url}
            src={url}
            alt={`${name} image ${index}` || "knife"}
            width={1000}
            height={1000}
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "cover",
              aspectRatio: "1/1",
            }}
            priority
          />
        ))}
        <ChevronCircleLeft className="z-20 shrink-0 opacity-[80%] hover:opacity-100 transition absolute top-1/2 left-2 transform -translate-y-1/2" />
        <ChevronCircleRight className="z-20 shrink-0 opacity-[80%] hover:opacity-100 transition absolute top-1/2 right-2 transform -translate-y-1/2" />
      </div> */}
      <div className="flex flex-col gap-6">
        <h3 className="col-span-full h-min">
          <span className="mr-6">{paddedNumber(index)}</span>
          <span>{name}</span>
        </h3>
        {description && (
          <div className={`${descriptionSpan} max-w-prose -my-1`}>
            {description.trim()}
          </div>
        )}
        <p>{`${wrap}, ${sheath}`}</p>
        {/* <table
          className="col-span-full w-full transition-all ease-out duration-150 "
          cellSpacing="0"
          cellPadding="0"
        >
          <tbody>
            {isSpecialProject ? (
              <tr className="border-t-[0.5px] border-white">
              <tr>
                <td>Special Project</td>
              </tr>
            ) : null}
            <tr className="flex gap-6 border-y-[0.5px] border-white">
            <tr className="flex">
              <td className="flex-1 leading-4 my-0.5">Wrap</td>
              <td className="flex-1 leading-4 my-0.5">{wrap}</td>
            </tr>
            <tr className="flex gap-6 border-b-[0.5px] border-white">
            <tr className="flex ">
              <td className="flex-1 leading-4 my-0.5">Sheath</td>
              <td className="flex-1 leading-4 my-0.5">{sheath}</td>
            </tr>
          </tbody>
        </table> */}
      </div>
      <ImageCarousel
        images={images}
        className={`
          col-span-full sm:col-span-2 relative h-fit
        `}
        // className={`
        //   col-span-full sm:col-span-2 relative h-fit
        //   ${cols.desktop === 3 || isShowingIndex ? "lg:col-span-1" : null}
        // `}
      />
      {/* <div className="col-span-full sm:col-span-2 grid grid-cols-2 gap-4 sm:gap-6">
        <h3 className="col-span-full hidden sm:inline-block text-md leading-5 md:text-lg md:leading-6 lg:text-[29px] lg:leading-7 text-right border-t-2 border-white pt-1 -mb-1">
          {name}
        </h3>
        <h3 className="col-span-full h-min">
          <span className="mr-6">{index}</span>
          <span>{name}</span>
        </h3>
        {description && (
          <div className={`${descriptionSpan} max-w-prose -my-1`}>
            {description.trim()}
          </div>
        )}
        <table
          className="col-span-full w-full transition-all ease-out duration-150 "
          cellSpacing="0"
          cellPadding="0"
        >
          <tbody>
            {isSpecialProject ? (
              <tr className="border-t-[0.5px] border-white">
                <td>Special Project</td>
              </tr>
            ) : null}
            <tr className="flex gap-6 border-y-[0.5px] border-white">
              <td className="flex-1 leading-4 my-0.5">Wrap</td>
              <td className="flex-1 leading-4 my-0.5">{wrap}</td>
            </tr>
            <tr className="flex gap-6 border-b-[0.5px] border-white">
              <td className="flex-1 leading-4 my-0.5">Sheath</td>
              <td className="flex-1 leading-4 my-0.5">{sheath}</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </Grid>
  );
}
