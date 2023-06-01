import type { Knife } from "../types/knife";

import { sanityClient as sanity } from "../lib/sanity/client";
import groq from "groq";

import React from "react";
import Gallery from "../components/Gallery";

async function getKnives() {
  return await sanity.fetch(
    groq`
      *[_type == "knife" && (!defined(isSpecialProject) || !isSpecialProject)] | 
      order(_createdAt desc) 
    {
      _id,
      name,
      wrap,
      sheath,
      description,
      isSpecialProject,
      "coverImageUrl": coverImage.asset->url,
      "galleryImageUrls": galleryImages[].asset->url,
    }`,
    { next: { tags: ["knives"] } }
  );
}

export default async function Knives() {
  const knives: Knife[] = await getKnives();

  return <Gallery knives={knives} />;
}
