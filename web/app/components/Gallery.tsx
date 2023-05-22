"use client";

import { Knife } from "../types/knife";

import React, { useState } from "react";
import Grid from "./Grid";
import Image from "next/image";
import ImageCarousel from "./ImageCarousel";
import * as Modal from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";

import { paddedNumber } from "../utils/formatting";

function GalleryList({
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

function CloseButton({ className = "" }) {
  return (
    <Modal.Close className={className}>
      <Image src="/icons/x-lg.svg" alt="close" height={48} width={48} />
    </Modal.Close>
  );
}

function BackButton({
  goBack,
  isOnFirstImage,
  className = "",
}: {
  goBack: () => void;
  isOnFirstImage: boolean;
  className?: string;
}) {
  if (isOnFirstImage) return null;

  return (
    <button className={`${className}`} onClick={goBack}>
      <Image
        src="/icons/chevron-left.svg"
        alt="Go to previous image"
        height={48}
        width={48}
      />
    </button>
  );
}

function NextButton({
  goToNext,
  isOnLastImage,
  className = "",
}: {
  goToNext: () => void;
  isOnLastImage: boolean;
  className?: string;
}) {
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
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  knives: Knife[];
  spotlitKifeIndex: number;
  setSpotlitKifeIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const knivesLength = knives.length;

  const back = () =>
    setSpotlitKifeIndex(
      (prevIndex: number) => (prevIndex - 1 + knivesLength) % knivesLength
    );

  const next = () =>
    setSpotlitKifeIndex((prevIndex: number) => (prevIndex + 1) % knivesLength);

  const spotlitKnife = knives[spotlitKifeIndex];

  const images = (
    spotlitKnife.galleryImageUrls
      ? [spotlitKnife.coverImageUrl, ...spotlitKnife.galleryImageUrls]
      : [spotlitKnife.coverImageUrl]
  ).map((url, index) => {
    return {
      url,
      alt: `${spotlitKnife.name} image ${index}`,
    };
  });

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Portal>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/[85%] z-[50] h-screen"
          >
            <Modal.Overlay className="fixed inset-0 z-[40] h-full" />
            <Modal.Content className="fixed inset-0 z-[50] bg-black ">
              <div className="flex lg:items-center justify-center relative h-full w-full p-6 sm:px-[72px] lg:p-[72px]">
                <span className="hidden sm:block sm:fixed  top-6 left-6 sm:-my-1  ">
                  {`${paddedNumber(spotlitKifeIndex + 1)}/${paddedNumber(
                    knivesLength
                  )}`}
                </span>
                <CloseButton className="hidden sm:block fixed bottom-3 sm:bottom-auto transform left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 sm:top-3 sm:right-3" />
                <BackButton
                  goBack={back}
                  isOnFirstImage={spotlitKifeIndex === 0}
                  className="hidden sm:block fixed bottom-3 sm:bottom-auto sm:top-1/2 left-2.5 transform sm:-translate-y-1/2"
                />
                <NextButton
                  goToNext={next}
                  isOnLastImage={knivesLength === spotlitKifeIndex + 1}
                  className="hidden sm:block fixed bottom-3 sm:bottom-auto sm:top-1/2 right-2.5 transform sm:-translate-y-1/2"
                />
                <nav className="sm:hidden bg-black/[85%] w-full fixed bottom-0 left-0 right-0 z-50">
                  <div className="flex justify-between relative w-full h-[72px]">
                    <BackButton
                      goBack={back}
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
                <section className="flex flex-col lg:justify-center lg:flex-row gap-6 w-full max-w-sm lg:max-w-md lg:max-w-none h-screen lg:h-fit overflow-y-auto lg:overflow-auto pb-[296px] lg:pb-0 h-min">
                  <ImageCarousel
                    images={images}
                    className="shrink-0 sm:min-h-[0px] lg:basis-[calc(100vh-144px)] aspect-square relative w-full lg:max-w-[calc(100vh-144px)] lg:max-h-[calc(100vh-144px)] h-min"
                  />
                  <div className="lg:basis-1/4 flex flex-col gap-6">
                    <div className="flex justify-between -my-1">
                      <span className="sm:hidden mr-6">
                        {paddedNumber(spotlitKifeIndex + 1)}
                      </span>
                      <h3 className="col-span-full h-min w-full">
                        {spotlitKnife.name}
                      </h3>
                    </div>
                    {spotlitKnife.description && (
                      <div className="max-w-prose -my-1">
                        {spotlitKnife.description.trim()}
                      </div>
                    )}
                    <p className="-my-1">{`${spotlitKnife.wrap}, ${spotlitKnife.sheath}`}</p>
                  </div>
                </section>
              </div>
            </Modal.Content>
          </motion.div>
        </AnimatePresence>
      </Modal.Portal>
    </Modal.Root>
  );
}

export default function Gallery({
  knives,
  listKnives,
  modalKnives,
}: {
  knives: Knife[];
  listKnives?: Knife[];
  modalKnives?: Knife[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spotlightKnifeIndex, setSpotlightKnifeIndex] = useState(0);

  const openModal = (index: number): void => {
    setSpotlightKnifeIndex(index);
    setIsModalOpen(true);
  };

  return knives ? (
    <>
      <GalleryList knives={listKnives || knives} openModal={openModal} />
      <GalleryModal
        knives={modalKnives || knives}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        spotlitKifeIndex={spotlightKnifeIndex}
        setSpotlitKifeIndex={setSpotlightKnifeIndex}
      />
    </>
  ) : null;
}
