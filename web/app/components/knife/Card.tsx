"use client";
import React from "react";
import Image from "next/image";
import Profile from "./Profile";
import * as Modal from "@radix-ui/react-dialog";

export default function Card({
  name,
  wrap,
  sheath,
  coverImageUrl,
  description,
  galleryImageUrls,
  isSpecialProject = false,
}: {
  name: string;
  wrap: string;
  sheath: string;
  coverImageUrl: string;
  description?: string;
  galleryImageUrls?: string[];
  isSpecialProject?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger className="col-span-2 md:col-span-1 relative group flex flex-col gap-6 brightness-[90%] hover:scale-[100.5%] hover:brightness-100 transition-all ease-out duration-300">
        {isSpecialProject ? (
          <div className="text-white group-hover:opacity-0 transform group-hover:-translate-y-1 absolute top-0 right-0 bg-black text-[10px] leading-6 uppercase tracking-wider px-2 transition-all duration-300 ease-in-out">
            Special Project
          </div>
        ) : null}
        <div className="absolute z-[2] transform top-0 right-0 h-px bg-white w-0 group-hover:w-full opacity-0 group-hover:opacity-100 transition-all ease-out duration-500"></div>
        <h3 className="absolute z-[1] transform translate-x-3 group-hover:translate-x-0 top-0 left-0 right-0 opacity-0 group-hover:opacity-100 leading-6 text-right transition-all duration-300 ease-out">
          {name}
        </h3>
        <div className="absolute transform top-0 left-0 right-0 bg-black h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"></div>
        <Image
          src={coverImageUrl}
          alt={name || "knife"}
          width={1000}
          height={1000}
          className="object-cover aspect-square height-auto max-w-full "
          priority
        />
      </Modal.Trigger>
      <Modal.Portal className="fixed inset-0 z-[30] h-screen">
        <Modal.Overlay className="fixed inset-0 bg-black z-[40] h-full" />
        <Modal.Content className="overflow-y-scroll flex items-center justify-center fixed inset-0 z-[50] h-full">
          <div className="relative flex sm:items-center justify-center h-full w-full p-6 pb-[72px] sm:p-[72px]">
            <Profile
              name={name}
              wrap={wrap}
              sheath={sheath}
              coverImageUrl={coverImageUrl}
              description={description}
              galleryImageUrls={galleryImageUrls}
              isSpecialProject={isSpecialProject}
              className="h-min max-h-[calc(100vh-72px)] md:max-h-none max-w-[400px] md:max-w-4xl shadow-2xl"
            />
            <Modal.Close className="fixed bottom-3 sm:bottom-auto transform left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 sm:top-3 sm:right-3">
              <Image src="/icons/x-lg.svg" alt="close" height={48} width={48} />
            </Modal.Close>
            <Image
              src="/icons/chevron-left.svg"
              alt="close"
              height={48}
              width={48}
              className="fixed bottom-3 sm:bottom-auto sm:top-1/2 left-2.5 transform sm:-translate-y-1/2"
            />
            <Image
              src="/icons/chevron-right.svg"
              alt="close"
              height={48}
              width={48}
              className="fixed bottom-3 sm:bottom-auto sm:top-1/2 right-2.5 transform sm:-translate-y-1/2"
            />
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}
