import type { Knife } from "../types/knife";

import { sanityClient as sanity } from "../lib/sanity/client";
import groq from "groq";

import React from "react";
import ProfileList from "../components/ProfileList";

async function getSpecialProjects() {
  return (await sanity.fetch(
    groq`*[_type == "knife" && isSpecialProject]{
      _id,
      name,
      wrap,
      sheath,
      description,
      isSpecialProject,
      "coverImageUrl": coverImage.asset->url,
      "galleryImageUrls": galleryImages[].asset->url,
    }`
  )) as Knife[];
}

export default async function SpecialProjects() {
  const specialProjects = await getSpecialProjects();

  return (
    <>
      <h1 className="col-span-full lg:col-start-2 lg:col-end-5 text-3xl md:text-4xl font-light tracking-[-0.07em] -ml-0.5 md:-ml-1 -my-1.5 md:-my-2">
        One-off, experimental knives I don&apos;t plan on making any more of
      </h1>
      {specialProjects.length ? (
        <ProfileList
          knives={specialProjects}
          isShowingIndex={true}
          itemCols={{ mobile: 4, desktop: 4 }}
        />
      ) : null}
    </>
  );
}
