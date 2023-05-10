"use client";

import React, { useRef, useState } from "react";
import Grid from "./Grid";
import Image from "next/image";
import ArrowRight from "./icons/ArrowRight";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [justSubscribed, setJustSubscribed] = useState(false);

  const subscribe = async (formData: FormData) => {
    const email = formData.get("email");
    if (!email) return;
    const res = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    if (res.status === 200) {
      emailRef.current.value = "";
      setJustSubscribed(true);
      setTimeout(() => setJustSubscribed(false), 5000);
    }
  };

  return (
    <Grid
      span="col-span-full lg:col-span-3"
      cols="grid-cols-4 lg:grid-cols-3"
      classes="text-lg"
    >
      <p className="col-span-full -my-1">Subscribe and never miss a batch</p>
      <form
        action={subscribe}
        className="relative self-end col-span-full flex items-center md:grid grid-cols-4 lg:grid-cols-3 gap-6 -mt-4"
      >
        <label
          htmlFor="email"
          className="md:col-span-3 lg:col-span-2 peer group relative w-full"
        >
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Your email"
            className="w-full peer flex-grow placeholder:text-neutral-500 leading-[40px] h-[40px] border-box bg-transparent border-neutral-500 border-b-2 focus:outline-none "
          />
          <span className="z-10 h-[2px] absolute bottom-0 left-0 bg-neutral-200 w-0 peer-focus:w-full transition-all duration-500 ease-out"></span>
        </label>
        <button
          className={`col-span-1 w-fit -ml-1 -mb-1 text-neutral-500 peer-valid:text-neutral-200 flex items-center shrink-0 text-xl transition duration-300`}
        >
          <ArrowRight classes="text-neutral-500" />
        </button>

        {justSubscribed ? (
          <div className="absolute -bottom-10 text-sm flex items-center gap-2 text-green-500">
            <Image
              src="/icons/check.svg"
              alt="checkmark"
              height={20}
              width={20}
            />
            <p>You&apos;re subscribed! Check for a verification email.</p>
          </div>
        ) : null}
      </form>
    </Grid>
  );
}
