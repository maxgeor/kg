import type { Knife } from "../types/knife";
import { paddedNumber } from "../utils/formatting";

import { sanityClient as sanity } from "../lib/sanity/client";
import groq from "groq";

import React from "react";
import ProfileList from "../components/ProfileList";
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
      <Grid>
        <span className="-my-1">{paddedNumber(specialProjects.length)}</span>
        <h1 className="col-span-full xl:col-span-3 text-3xl sm:text-4xl tracking-[-0.085em] font-extralight -ml-0.5 md:-ml-1 -my-1.5 md:-my-2">
          One-off, experimental knives I don&apos;t plan on making any more of
        </h1>
      </Grid>
      {specialProjects.length ? <ProfileList knives={specialProjects} /> : null}
    </>
  );
}
