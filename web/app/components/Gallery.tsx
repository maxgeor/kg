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
    <Grid tag="ul" gap="sm:gap-6" className="-mx-6 sm:mx-0">
      {knives?.map((knife: Knife, index: number) => (
        <li
          key={knife._id}
          id={`knife-${index}`}
          className="col-span-2 md:col-span-1"
        >
          <button
            className="relative group flex flex-col gap-6 lg:brightness-[85%] hover:scale-[100.5%] hover:brightness-100 transition-all ease-out duration-300"
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

function CloseButton({ className = "" }) {
  return (
    <Modal.Close className={className}>
      <Image src="/icons/x-lg.svg" alt="close" height={48} width={48} />
    </Modal.Close>
  );
}

function PrevButton({ goToPrev, isOnFirstImage, className = "" }) {
  if (isOnFirstImage) return null;

  return (
    <button className={`${className}`} onClick={goToPrev}>
      <Image
        src="/icons/chevron-left.svg"
        alt="Go to previous image"
        height={48}
        width={48}
      />
    </button>
  );
}

function NextButton({ goToNext, isOnLastImage, className = "" }) {
  if (isOnLastImage) return null;

  return (
    <button className={`justify-self-end ${className}`} onClick={goToNext}>
      <Image
        src="/icons/chevron-right.svg"
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

  const prev = () =>
    setSpotlitKifeIndex(
      (prevIndex) => (prevIndex - 1 + knivesLength) % knivesLength
    );

  const next = () =>
    setSpotlitKifeIndex((prevIndex) => (prevIndex + 1) % knivesLength);

  const spotlitKnife = knives[spotlitKifeIndex];

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Portal className="fixed inset-0 z-[30] h-screen">
        <Modal.Overlay className="fixed inset-0 bg-black z-[40] h-full" />
        <Modal.Content className="overflow-y-scroll flex items-center justify-center fixed inset-0 z-[50] h-full">
          <div className="relative flex sm:items-center justify-center h-full w-full p-6 sm:p-[72px]">
            {/* <span className="absolute sm:fixed top-8 sm:top-6 left-6 sm:text-md -my-1.5 sm:-my-1  "> */}
            <span className="absolute sm:fixed top-8 sm:top-6 left-6 -my-1.5 sm:-my-1  ">
              {`${paddedNumber(spotlitKifeIndex + 1)}/${paddedNumber(
                knivesLength
              )}`}
            </span>
            <CloseButton className="hidden sm:block fixed bottom-3 sm:bottom-auto transform left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 sm:top-3 sm:right-3" />
            <PrevButton
              goToPrev={prev}
              isOnFirstImage={spotlitKifeIndex === 0}
              className="hidden sm:block fixed bottom-3 sm:bottom-auto sm:top-1/2 left-2.5 transform sm:-translate-y-1/2"
            />
            <NextButton
              goToNext={next}
              isOnLastImage={knivesLength === spotlitKifeIndex + 1}
              className="hidden sm:block fixed bottom-3 sm:bottom-auto sm:top-1/2 right-2.5 transform sm:-translate-y-1/2"
            />
            <nav className="sm:hidden bg-black/[85%] w-full fixed bottom-0 left-0 right-0">
              <div className="flex justify-between relative w-full h-[72px]">
                <PrevButton
                  goToPrev={prev}
                  isOnFirstImage={spotlitKifeIndex === 0}
                  className="absolute left-2 transform top-1/2 -translate-y-1/2"
                />
                <CloseButton className="absolute transform top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
                <NextButton
                  goToNext={next}
                  isOnLastImage={knivesLength === spotlitKifeIndex + 1}
                  className="absolute right-2 transform top-1/2 -translate-y-1/2"
                />
              </div>
            </nav>
            <Profile
              index={spotlitKifeIndex}
              showingIndex={false}
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
              isSpecialProject={spotlitKnife.isSpecialProject}
              className="h-min md:max-h-none sm:max-w-5xl shadow-2xl"
            />
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}

export default function Gallery({ knives }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spotlightKnifeIndex, setSpotlightKnifeIndex] = useState(0);

  const openModal = (index: number): void => {
    setSpotlightKnifeIndex(index);
    setIsModalOpen(true);
  };

  return knives ? (
    <>
      <GalleryList knives={knives} openModal={openModal} />
      <GalleryModal
        knives={knives}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        spotlitKifeIndex={spotlightKnifeIndex}
        setSpotlitKifeIndex={setSpotlightKnifeIndex}
      />
    </>
  ) : null;
}
