"use client";

import React, { useState } from "react";

import Grid from "./Grid";
import Image from "next/image";
import ArrowRight from "./icons/ArrowRight";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  async function subscribe(e: React.SyntheticEvent) {
    e.preventDefault;
    if (!email) return setError("Add your email");

    setError("");
    setSubscribed(false);
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "content-type": "application/json" },
      });

      const data = await res.json();

      if (data.success) {
        setEmail("");
        setSubscribed(true);
      } else {
        setError("Something went wrong, please try again later");
      }
    } catch (e) {
      setError((e as Error).message);
    }

    setLoading(false);
  }

  return (
    <Grid
      span="col-span-full lg:col-span-3"
      cols="grid-cols-4 lg:grid-cols-3"
      className="text-md"
    >
      <p className="col-span-full -my-1 mr-12">
        Subscribe and never miss a drop
      </p>
      <form
        method="post"
        onSubmit={(e) => subscribe(e)}
        className="relative self-end col-span-full flex items-center md:grid grid-cols-4 lg:grid-cols-3 gap-6 -mt-3"
      >
        <label
          htmlFor="email"
          className="md:col-span-3 lg:col-span-2 peer group relative w-full"
        >
          <input
            required
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full peer flex-grow placeholder:text-neutral-500 leading-8 h-8 border-box bg-transparent border-neutral-500 border-b focus:outline-none "
          />
          <span className="z-10 h-px absolute bottom-0 left-0 bg-white w-0 peer-focus:w-full transition-all duration-500 ease-out"></span>
        </label>
        <button
          type="submit"
          className={`col-span-1 w-fit -m-1 text-white disabled:text-neutral-500 flex items-center shrink-0 text-xl transition duration-300`}
          disabled={loading}
        >
          <ArrowRight className="text-neutral-500" />
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
