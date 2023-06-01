import type { Knife } from "../types/knife";
import { paddedNumber } from "../utils/formatting";

import { sanityClient as sanity } from "../lib/sanity/client";
import groq from "groq";

import React from "react";
import ProfileList from "../components/knife/ProfileList";
import Grid from "../components/Grid";

async function getSpecialProjects() {
  return await sanity.fetch(
    groq`*[_type == "knife" && isSpecialProject] | order(_createdAt desc) {
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

export default async function SpecialProjects() {
  const specialProjects: Knife[] = await getSpecialProjects();

  return (
    <>
      <Grid className="relative border-t-[3px] md:border-t-4 pt-5 md:pt-6">
        <h1 className="mr-12 sm:mr-24 lg:mr-0 col-span-full lg:col-span-4 text-3xl sm:text-4xl tracking-[-0.08em] font-light -ml-1 -my-2 sm:-my-2.5">
          One-off, experimental knives I don&apos;t plan on making any more of
        </h1>
        <span className="absolute lg:static top-5 right-0 lg:order-first -my-1">
          {paddedNumber(specialProjects.length)}
        </span>
      </Grid>
      {specialProjects.length ? <ProfileList knives={specialProjects} /> : null}
    </>
  );
}
