import React from "react";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <div className="col-span-full md:col-span-1 flex flex-col gap-y-3">
        <Link
          href="https://www.instagram.com/kg.handcrafted/"
          target="_blank"
          className="underline -my-1"
        >
          Instagram
        </Link>
        <p className="-my-1">kevin_g8405@hotmail.com</p>
      </div>
      <div className="col-span-full md:col-span-3">
        <p className="-my-1">
          To buy a knife or connect,{" "}
          <Link
            href="https://ig.me/m/kg.handcrafted"
            target="_blank"
            className="underline"
          >
            DM me on Instagram
          </Link>{" "}
          or send an email.
        </p>
      </div>
    </>
  );
}
