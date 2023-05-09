import type { Knife } from "../../types/knife";

import { sanityClient as sanity } from "../../lib/sanity/client";
import groq from "groq";

async function knivesQuery(): Promise<Knife[]> {
  return await sanity.fetch(
    groq`*[_type == "knife" && !isFeatured]{
      _id,
      name,
      wrap,
      sheath,
      "coverImageUrl": coverImage.asset->url,
    }
  `);
}

async function featuredKnivesQuery(): Promise<Knife[]>  {
  return await sanity.fetch(
    groq`*[_type == "knife" && defined(isFeatured) && isFeatured]{
      _id,
      name,
      wrap,
      sheath,
      description,
      "coverImageUrl": coverImage.asset->url,
      "galleryImageUrls": galleryImages[].asset->url,
    }
  `);
}

async function knifeQuery(id: string): Promise<Knife> {
  return await sanity.fetch(
    groq`*[_type == "knife" && _id == ${id}]{
      _id,
      name,
      wrap,
      sheath,
      description,
      "coverImageUrl": coverImage.asset->url,
      "galleryImageUrls": galleryImages[].asset->url,
    }
  `);
}

export { knivesQuery, featuredKnivesQuery, knifeQuery };