import type { Knife } from "./types/knife";

import { sanityClient as sanity } from "./lib/sanity/client";
import groq from "groq";

import React from "react";
import Grid from "./components/Grid";
import Profile from "./components/Profile";
import ProfileList from "./components/ProfileList";
import Subscribe from "./components/Subscribe";
import Gallery from "./components/Gallery";

async function getFeaturedKnives() {
  return await sanity.fetch(
    groq`*[_type == "knife" && isFeatured]{
      _id,
      name,
      wrap,
      sheath,
      description,
      "coverImageUrl": coverImage.asset->url,
      "galleryImageUrls": galleryImages[].asset->url,
    }`
  );
}

async function getKnives() {
  return await sanity.fetch(
    groq`*[_type == "knife" && (!defined(isFeatured) || !isFeatured)]{
      _id,
      name,
      wrap,
      sheath,
      description,
      isSpecialProject,
      "coverImageUrl": coverImage.asset->url,
      "galleryImageUrls": galleryImages[].asset->url,
    }`
  );
}

export default async function Home() {
  const featuredKnivesData = await getFeaturedKnives();
  const knivesData = await getKnives();

  const [featuredKnives, knives]: [featuredKnives: Knife[], knives: Knife[]] =
    await Promise.all([featuredKnivesData, knivesData]);

  return (
    <>
      <Grid gap="gap-y-12 gap-x-6" className="relative border-white w-full ">
        <h1 className="col-span-full lg:col-span-3 text-3xl sm:text-4xl md:text-5xl md:leading-[88px] lg:leading-[100px] lg:text-6xl font-light md:font-extralight tracking-[-0.07em] md:tracking-[-0.085em] -my-2 lg:-my-3 lg:-my-3.5 -ml-0.5 sm:-ml-1 md:-ml-1.5 max-w-[1400px]">
          Hartsfield-inspired blades, carefully crafted, one at a time
        </h1>
        <div className="h-full col-span-full lg:col-span-1 flex flex-col justify-between lg:order-first lg:pr-[72px]">
          <div className="grid grid-cols-4 lg:flex lg:flex-col justify-between lg:justify-start gap-x-6 gap-y-12">
            <p className="col-span-2 -my-1">
              Functional, subtracted knives built with natural materials
            </p>
            <p className="text-right sm:text-left col-span-2 sm:col-start-4 text-[10px] sm:col-end-5 leading-4 -my-0.5 uppercase tracking-wider">
              Crafted in
              <br className="lg:hidden" /> Canada
            </p>
          </div>
        </div>
      </Grid>
      {featuredKnives.length ? (
        <Grid>
          <h2 className="col-span-full lg:col-span-1 text-md text-white -my-0.5 z-10">
            Featured Work
          </h2>
          <ProfileList
            knives={featuredKnives}
            cols="grid-cols-4 lg:grid-cols-3"
            span="col-span-full lg:col-span-3"
            itemCols={{ mobile: 4, desktop: 3 }}
          />
        </Grid>
      ) : null}
      <Grid>
        <h2 className="col-span-full lg:col-span-1 text-md text-white -my-0.5">
          News
        </h2>
        <Grid
          span="col-span-full lg:col-span-3"
          cols="grid-cols-4 lg:grid-cols-3"
          gap="gap-y-12 gap-x-6"
        >
          <div className="group flex flex-col gap-6 col-span-full">
            <h2 className="hover:underline decoration-2 underline-offset-2 font-light tracking-[-0.07em] text-3xl -my-1 lg:-my-2 -ml-[3px]">
              Batch of 10 knives realeasing
            </h2>
            <p className="line-clamp-2 -my-1 max-w-prose">
              I&apos;m teaming up with @thebeastman to make 10 tanaki-inspired
              knives. Each will sell for $250. To buy, message me on Instagram
              or email.
            </p>
          </div>
          <Subscribe />
        </Grid>
      </Grid>
      <Grid>
        <h2 className="col-span-full lg:col-span-1 text-md text-white -my-0.5">
          All Work
        </h2>
        <Gallery knives={knives} />
      </Grid>
    </>
  );
}
