import React from "react";
import Grid from "./Grid";
import Image from "next/image";
import ChevronCircleLeft from "./icons/ChevronCircleLeft";
import ChevronCircleRight from "./icons/ChevronCircleRight";

export default function Profile({
  name,
  wrap,
  sheath,
  coverImageUrl,
  description,
  descriptionSpan = { mobile: "full", tablet: "full", desktop: 1 },
  galleryImageUrls,
  cols = { mobile: 4, desktop: 4 },
  isSpecialProject = false,
  classes = "",
}: {
  name: string;
  wrap: string;
  sheath: string;
  coverImageUrl: string;
  description?: string;
  descriptionSpan?: {
    mobile: "full" | 1 | 2;
    tablet: "full" | 1 | 2;
    desktop: "full" | 1 | 2;
  };
  galleryImageUrls?: string[];
  isSpecialProject?: boolean;
  cols?: { mobile: 3 | 4; desktop: 3 | 4 };
  classes?: string;
}) {
  return (
    <Grid
      cols={`grid-cols-${cols.mobile} lg:grid-cols-${cols.desktop}`}
      gap="gap-y-4 gap-x-6 md:gap-6"
      classes={`
        bg-black border-t-2 md:border-0 border-neutral-200
        ${classes}
      `}
    >
      <h3 className="md:hidden text-md col-span-full text-right pt-2 -my-1 ">
        {name}
      </h3>
      <div
        className={`
        col-span-full md:col-span-2 relative 
        ${cols.desktop === 3 ? "lg:col-span-1" : null}
      `}
      >
        <Image
          src={coverImageUrl}
          alt={name || "knife"}
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
        <ChevronCircleLeft classes="z-20 shrink-0 opacity-[80%] hover:opacity-100 transition absolute top-1/2 left-2 transform -translate-y-1/2" />
        <ChevronCircleRight classes="z-20 shrink-0 opacity-[80%] hover:opacity-100 transition absolute top-1/2 right-2 transform -translate-y-1/2" />
      </div>
      <div className="col-span-full md:col-span-2 grid grid-cols-2 gap-4 md:gap-6">
        <h3 className="col-span-full md:col-span-2 hidden md:inline-block text-lg text-right border-t-2 border-neutral-200 pt-1">
          {name}
        </h3>
        {description && (
          <p
            className={`col-span-${descriptionSpan.mobile} md:col-span-${descriptionSpan.tablet} xl:col-span-${descriptionSpan.desktop} -my-1`}
          >
            {description.trim()}
          </p>
        )}
        <table
          className="col-span-full md:col-span-2 self-end w-full transition-all ease-out duration-150 "
          cellSpacing="0"
          cellPadding="0"
        >
          <tbody>
            {isSpecialProject ? (
              <tr className="border-t border-neutral-200">
                <td>Special Project</td>
              </tr>
            ) : null}
            <tr className="flex gap-6 border-y border-neutral-200">
              <td className="flex-1 leading-4 my-0.5">Wrap</td>
              <td className="flex-1 leading-4 my-0.5">{wrap}</td>
            </tr>
            <tr className="flex gap-6 border-b border-neutral-200">
              <td className="flex-1 leading-4 my-0.5">Sheath</td>
              <td className="flex-1 leading-4 my-0.5">{sheath}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Grid>
  );
}
