import type { Knife } from "../types/knife";

import { sanityClient as sanity } from "../lib/sanity/client";
import groq from "groq";

import React from "react";
import Gallery from "../components/Gallery";

async function getKnives() {
  return (await sanity.fetch(
    groq`*[_type == "knife" && (!defined(isSpecialProject) || !isSpecialProject)]{
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

export default async function Knives() {
  const knives = await getKnives();

  return <Gallery knives={knives} />;
}
