import React from "react";
import Grid from "./Grid";
import Image from "next/image";
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
  classes = "",
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
  classes?: string;
}) {
  return (
    <Grid
      cols={`grid-cols-${cols.mobile} lg:grid-cols-${cols.desktop}`}
      gap="gap-y-4 gap-x-6 sm:gap-6"
      classes={`bg-black ${classes}`}
    >
      <h3 className="sm:hidden text-lg col-span-full text-right pt-1 border-t-2 border-neutral-200">
        {name}
      </h3>
      {isShowingIndex ? (
        <span className="hidden lg:block font-mono text-lg">
          {paddedNumber(index)}
        </span>
      ) : null}
      <div
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
        <ChevronCircleLeft classes="z-20 shrink-0 opacity-[80%] hover:opacity-100 transition absolute top-1/2 left-2 transform -translate-y-1/2" />
        <ChevronCircleRight classes="z-20 shrink-0 opacity-[80%] hover:opacity-100 transition absolute top-1/2 right-2 transform -translate-y-1/2" />
      </div>
      <div className="col-span-full sm:col-span-2 grid grid-cols-2 gap-4 sm:gap-6">
        <h3 className="col-span-full hidden sm:inline-block text-lg lg:text-[29px] text-right border-t-2 border-neutral-200 pt-1 -mb-1">
          {name}
        </h3>
        {description && (
          <div className={`${descriptionSpan} max-w-prose -my-1`}>
            {description.trim()}
          </div>
        )}
        <table
          className="col-span-full sm:col-span-2 self-end w-full transition-all ease-out duration-150 "
          cellSpacing="0"
          cellPadding="0"
        >
          <tbody>
            {isSpecialProject ? (
              <tr className="border-t-[0.5px] border-neutral-200">
                <td>Special Project</td>
              </tr>
            ) : null}
            <tr className="flex gap-6 border-y-[0.5px] border-neutral-200">
              <td className="flex-1 leading-4 my-0.5">Wrap</td>
              <td className="flex-1 leading-4 my-0.5">{wrap}</td>
            </tr>
            <tr className="flex gap-6 border-b-[0.5px] border-neutral-200">
              <td className="flex-1 leading-4 my-0.5">Sheath</td>
              <td className="flex-1 leading-4 my-0.5">{sheath}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Grid>
  );
}
