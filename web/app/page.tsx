import type { Knife } from "./types/knife";

import { sanityClient as sanity } from "./lib/sanity/client";
import groq from "groq";

import React from "react";
import Grid from "./components/Grid";
import ProfileList from "./components/ProfileList";
import Subscribe from "./components/Subscribe";
import Gallery from "./components/Gallery";
import { paddedNumber } from "./utils/formatting";

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

async function getNonFeaturedKnives() {
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
  const nonFeaturedKnivesData = await getNonFeaturedKnives();

  const [featuredKnives, nonFeaturedKnives]: [
    featuredKnives: Knife[],
    nonFeaturedKnives: Knife[]
  ] = await Promise.all([featuredKnivesData, nonFeaturedKnivesData]);

  return (
    <>
      <Grid gap="gap-6 gap-y-12" className="relative border-white w-full ">
        <h1 className="col-span-full xl:col-span-3 text-4xl sm:text-5xl lg:text-6xl  sm:leading-[88px] lg:leading-[104px] font-extralight tracking-[-0.085em] -my-2.5 sm:-my-3 xl:-my-[18px] -ml-0.5 sm:-ml-1 md:-ml-1.5 xl:-ml-2.5 max-w-[1400px]">
          Hartsfield-
          <br className="xl:hidden" />
          inspired blades, <br />
          carefully crafted,
          <br /> one at a time
        </h1>
        <div className="xl:order-first col-span-full xl:col-span-1 flex gap-6 h-full lg:pr-[72px] -my-1">
          <span>
            {paddedNumber(featuredKnives.length + nonFeaturedKnivesData.length)}
          </span>
          <span>
            Functional, subtracted knives built with natural materials
          </span>
        </div>
      </Grid>
      {featuredKnives.length ? (
        <Grid>
          <ProfileList knives={featuredKnives} />
        </Grid>
      ) : null}
      <Grid>
        <h2 className="col-span-full xl:col-span-1 text-white -my-1">News</h2>
        <Grid
          span="col-span-full xl:col-span-3"
          cols="grid-cols-4 xl:grid-cols-3"
          gap="gap-y-12 gap-x-6"
        >
          <div className="group flex flex-col gap-6 col-span-full">
            <h2 className="hover:underline decoration-2 underline-offset-2 font-light tracking-[-0.07em] text-2xl md:text-3xl xl:text-4xl -my-1 lg:-my-2 -ml-[3px]">
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
        <Gallery knives={nonFeaturedKnives} />
      </Grid>
    </>
  );
}
