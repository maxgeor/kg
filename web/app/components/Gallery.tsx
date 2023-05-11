"use client";

import { Knife } from "../types/knife";

import React, { useState } from "react";
import Grid from "./Grid";
import Image from "next/image";
import Profile from "./Profile";
import * as Modal from "@radix-ui/react-dialog";

import { paddedNumber } from "../utils/formatting";

function GalleryList({ knives, openModal }) {
  return (
    <Grid tag="ul">
      {knives?.map((knife: Knife, index: number) => (
        <li
          key={knife._id}
          id={`knife-${index}`}
          className="col-span-2 md:col-span-1"
        >
          <button
            className="relative group flex flex-col gap-6 brightness-[85%] hover:scale-[100.5%] hover:brightness-100 transition-all ease-out duration-300"
            onClick={() => openModal(index)}
          >
            {knife.isSpecialProject ? (
              <div className="text-neutral-200 group-hover:opacity-0 transform group-hover:-translate-y-1 absolute top-0 right-0 bg-black text-[10px] leading-6 uppercase tracking-wider px-2 transition-all duration-300 ease-in-out">
                Special Project
              </div>
            ) : null}
            <div className="absolute z-[2] transform top-0 right-0 h-px bg-neutral-200 w-0 group-hover:w-full opacity-0 group-hover:opacity-100 transition-all ease-out duration-500"></div>
            <h3 className="absolute z-[1] transform translate-x-3 group-hover:translate-x-0 top-0 left-0 right-0 opacity-0 group-hover:opacity-100 leading-6 text-right transition-all duration-300 ease-out">
              {knife.name}
            </h3>
            <div className="absolute transform top-0 left-0 right-0 bg-black h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"></div>
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

function CloseButton({ classes = "" }) {
  return (
    <Modal.Close className={classes}>
      <Image src="/icons/x-lg.svg" alt="close" height={48} width={48} />
    </Modal.Close>
  );
}

function PrevButton({ goBack, isOnFirstImage, classes = "" }) {
  if (isOnFirstImage) return null;

  return (
    <button className={classes} onClick={goBack}>
      <Image
        src="/icons/chevron-left-lg.svg"
        alt="Go to previous image"
        height={48}
        width={48}
      />
    </button>
  );
}

function NextButton({ goForward, isOnLastImage, classes = "" }) {
  if (isOnLastImage) return null;

  return (
    <button className={classes} onClick={goForward}>
      <Image
        src="/icons/chevron-right-lg.svg"
        alt="Go to next image"
        height={48}
        width={48}
      />
    </button>
  );
}

function GalleryModal({
  open,
  setOpen,
  knives,
  spotlitKifeIndex,
  setSpotlitKifeIndex,
}) {
  const knivesLength = knives.length;

  const prev = () => {
    setSpotlitKifeIndex(
      (prevIndex) => (prevIndex - 1 + knivesLength) % knivesLength
    );
  };

  const next = () => {
    setSpotlitKifeIndex((prevIndex) => (prevIndex + 1) % knivesLength);
  };

  const spotlitKnife = knives[spotlitKifeIndex];

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Portal className="fixed inset-0 z-[30] h-screen">
        <Modal.Overlay className="fixed inset-0 bg-black z-[40] h-full" />
        <Modal.Content className="overflow-y-scroll flex items-center justify-center fixed inset-0 z-[50] h-full">
          <div className="relative flex sm:items-center justify-center h-full w-full p-6 sm:p-[72px]">
            <span className="absolute sm:fixed top-8 sm:top-6 left-6 text-base sm:text-lg font-mono sm:font-light -my-1  ">
              {`${paddedNumber(spotlitKifeIndex)}/${paddedNumber(
                knivesLength - 1
              )}`}
            </span>
            <CloseButton classes="hidden sm:block fixed bottom-3 sm:bottom-auto transform left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 sm:top-3 sm:right-3" />
            <Profile
              name={spotlitKnife.name}
              wrap={spotlitKnife.wrap}
              sheath={spotlitKnife.sheath}
              imageUrls={
                spotlitKnife.galleryImageUrls
                  ? [
                      spotlitKnife.coverImageUrl,
                      ...spotlitKnife.galleryImageUrls,
                    ]
                  : [spotlitKnife.coverImageUrl]
              }
              description={spotlitKnife.description}
              descriptionSpan={{ mobile: "full", desktop: "full" }}
              isSpecialProject={spotlitKnife.isSpecialProject}
              classes="h-min md:max-h-none sm:max-w-[375px] md:max-w-5xl shadow-2xl"
            />
            <PrevButton
              goBack={prev}
              isOnFirstImage={spotlitKifeIndex !== 0}
              classes="hidden sm:block fixed bottom-3 sm:bottom-auto sm:top-1/2 left-2.5 transform sm:-translate-y-1/2"
            />
            <NextButton
              goForward={next}
              isOnLastImage={knivesLength !== spotlitKifeIndex + 1}
              classes="hidden sm:block fixed bottom-3 sm:bottom-auto sm:top-1/2 right-2.5 transform sm:-translate-y-1/2"
            />
            <nav className=" sm:hidden bg-black/[85%] w-full fixed bottom-0 left-0 right-0 p-3">
              <div className="flex justify-between relative">
                <PrevButton
                  goBack={prev}
                  isOnFirstImage={spotlitKifeIndex !== 0}
                />
                <CloseButton classes="absolute transform top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
                <NextButton
                  goForward={next}
                  isOnLastImage={knivesLength !== spotlitKifeIndex + 1}
                />
              </div>
            </nav>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}

export default function Gallery({ knives }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number): void => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <GalleryList knives={knives} openModal={openModal} />
      <GalleryModal
        knives={knives}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        spotlitKifeIndex={selectedImageIndex}
        setSpotlitKifeIndex={setSelectedImageIndex}
      />
    </>
  );
}
