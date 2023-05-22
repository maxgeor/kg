"use client";

import React, { useState } from "react";
import * as Modal from "@radix-ui/react-dialog";

export default function TestModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Portal>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Modal.Content className="flex items-center justify-center bg-black/80 w-full rounded-md z-50">
            <button
              className="hidden sm:block absolute top-2 right-2 hover:text-gray-700"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <div className="flex flex-col sm:flex-row gap-6  h-screen border border-white max-w-md">
              <div className="bg-white w-full aspect-square min-w-[calc(100vw-48px)] sm:min-w-none sm:basis-3/4 sm:max-h-[calc(100vh-144px)] sm:max-w-[calc(100vh-144px)]"></div>
              <div className="flex flex-col gap-y-6 sm:basis-1/4">
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
                <p>Youou</p>
              </div>
            </div>
            {/* <nav className="sm:hidden bg-black/[85%] w-full fixed bottom-0 left-0 right-0 border border-white"> */}
            <nav className="bg-black/[85%] w-full fixed bottom-0 left-0 right-0 border border-white">
              <div className="flex justify-between relative w-full h-[72px] px-6">
                <p className="absolute left-2 transform top-1/2 -translate-y-1/2 border border-white flex items-center justify-center h-12 w-12">
                  Prev
                </p>
                <button
                  className="absolute transform top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border border-white flex items-center justify-center h-12 w-12"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
                <p className="absolute right-2 transform top-1/2 -translate-y-1/2 border border-white flex items-center justify-center h-12 w-12">
                  Next
                </p>
              </div>
            </nav>
          </Modal.Content>
        </div>
      </Modal.Portal>
    </Modal.Root>
  );
}
