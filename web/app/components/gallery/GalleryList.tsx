import { Knife } from "../../types/knife";

import React from "react";
import Image from "next/image";
import Grid from "../Grid";
import { paddedNumber } from "../../utils/formatting";

export default function GalleryList({
  knives,
  openModal,
}: {
  knives: Knife[];
  openModal: (index: number) => void;
}) {
  return (
    <Grid tag="ul">
      {knives?.map((knife: Knife, index: number) => (
        <li
          className="col-span-2 lg:col-span-1"
          key={knife._id}
          id={`knife-${index}`}
        >
          <button
            className="col-span-1 relative group flex flex-col gap-6 active:brightness-[90%] duration-100 transition ease-out"
            onClick={() => openModal(index)}
          >
            {knife.isSpecialProject ? (
              <div className="text-white group-hover:opacity-0 transform group-hover:-translate-y-1 absolute top-0 left-0 bg-black text-[10px] leading-6 uppercase tracking-wider px-2 transition-all duration-300 ease-in-out">
                Special Project
              </div>
            ) : null}
            <h3 className="bg-black w-full text-left absolute z-[1] transform top-0 left-0 right-0 opacity-0 group-hover:opacity-100 leading-6 transition-all duration-300 ease-out">
              <span className="mr-6">{paddedNumber(index + 1)}</span>
              <span>{knife.name}</span>
            </h3>
            <Image
              src={knife.coverImageUrl}
              alt={knife.name || "knife"}
              width={1000}
              height={1000}
              className="object-cover aspect-square height-auto max-w-full "
              priority
            />
          </button>
        </li>
      ))}
    </Grid>
  );
}
