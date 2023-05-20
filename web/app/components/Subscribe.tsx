"use client";

import React, { useState } from "react";
import { subscribe } from "../actions";

import Grid from "./Grid";
import Image from "next/image";

export default function Subscribe({
  span = "col-span-full xl:col-span-3",
  cols = "grid-cols-4 xl:grid-cols-3",
}: {
  span?: string;
  cols?: string;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault;
    if (!email) return setError("Add your email");

    setError("");
    setSubscribed(false);
    setLoading(true);

    try {
      const { success, error } = await subscribe(email);

      if (success) {
        setEmail("");
        return setSubscribed(true);
      }
      setError(error);
    } catch (e) {
      setError((e as Error).message);
    }

    setLoading(false);
  }

  return (
    // <Grid gap="gap-2" cols={cols} span={span} className="text-base">
    <Grid gap="gap-2" cols={cols} span={span}>
      <p className="col-span-full -my-1 mr-12">
        Subscribe and never miss a drop
      </p>
      <form
        method="post"
        onSubmit={(e) => handleSubmit(e)}
        className="relative self-end col-span-full flex md:grid grid-cols-4 xl:grid-cols-3 gap-6 -mb-1.5"
      >
        <label
          htmlFor="email"
          className="h-fit md:col-span-3 xl:col-span-2 peer group relative w-full"
        >
          <input
            required
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            // className="w-full peer flex-grow placeholder:text-neutral-500 leading-7 h-7 border-box bg-transparent border-neutral-500 border-b focus:outline-none "
            className="w-full peer flex-grow placeholder:text-neutral-500 leading-6 h-6 border-box bg-transparent border-neutral-500 border-b focus:outline-none "
          />
          <span className="z-10 h-px absolute bottom-0 left-0 bg-white w-0 peer-focus:w-full transition-all duration-500 ease-out"></span>
        </label>
        <button
          type="submit"
          className={`col-span-1 w-fit -m-1 text-white disabled:text-neutral-500 flex items-center shrink-0 text-xl transition duration-300`}
          disabled={loading}
        >
          <Image
            src="/icons/arrow-right.svg"
            alt="subscribe"
            height={38}
            width={38}
          />
        </button>
        {error ? (
          <p className="col-span-full absolute -bottom-10 text-sm text-red-400">
            {error}
          </p>
        ) : null}
        {subscribed ? (
          <div className="col-span-full text-sm flex items-center gap-2 text-green-500">
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
