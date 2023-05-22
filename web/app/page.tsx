import type { Knife } from "./types/knife";
import type { News } from "./types/news";

import { sanityClient as sanity } from "./lib/sanity/client";
import groq from "groq";

import React from "react";
import Link from "next/link";
import Grid from "./components/Grid";
import ProfileList from "./components/ProfileList";
import Subscribe from "./components/Subscribe";
import Gallery from "./components/Gallery";
import { paddedNumber } from "./utils/formatting";

async function getFeaturedKnives() {
  return await sanity.fetch(
    groq`*[_type == "knife" && isFeatured] {
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
    groq`
      *[_type == "knife" && (!defined(isFeatured) || !isFeatured)] | 
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
    }`
  );
}

async function getLatestNewsItem() {
  return await sanity.fetch(
    groq`*[_type == "news"] | order(_createdAt desc)[0] {
      _id,
      title,
      'slug': slug.current,
      content,
    }`
  );
}

export default async function Home() {
  const featuredKnivesData = await getFeaturedKnives();
  const nonFeaturedKnivesData = await getNonFeaturedKnives();
  const latestNewsItemData = await getLatestNewsItem();

  const [featuredKnives, nonFeaturedKnives, latestNewsItem]: [
    featuredKnives: Knife[],
    nonFeaturedKnives: Knife[],
    latestNewsItem: News
  ] = await Promise.all([
    featuredKnivesData,
    nonFeaturedKnivesData,
    latestNewsItemData,
  ]);

  return (
    <>
      <Grid gap="gap-6 gap-y-12" className="relative border-white w-full ">
        <h1 className="col-span-full xl:col-span-3 text-3xl xs:text-4xl sm:text-5xl  sm:leading-[88px] font-light tracking-[-0.08em] -my-2.5 sm:-my-3 lg:-my-3.5 -ml-0.5 sm:-ml-1 md:-ml-1.5 lg:-ml-2.5 max-w-[1400px]">
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
          {latestNewsItem ? (
            <Link
              href={`/news/${latestNewsItem.slug}`}
              className="group flex flex-col gap-6 col-span-full"
            >
              <h2 className="group-hover:underline decoration-2 underline-offset-2 font-light tracking-[-0.08em] text-2xl md:text-3xl -my-1 md:-my-1.5 -ml-[3px]">
                {latestNewsItem.title}
              </h2>
              <p className="line-clamp-2 -my-1 max-w-prose">
                {latestNewsItem.content[0]?.children[0]?.text}
              </p>
            </Link>
          ) : null}
          <Subscribe />
        </Grid>
      </Grid>
      <Grid>
        <Gallery knives={nonFeaturedKnives} />
      </Grid>
    </>
  );
}
