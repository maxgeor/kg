import type { Knife } from "./types/knife";

import { sanityClient as sanity } from "./lib/sanity/client";
import groq from "groq";

import React from "react";
import Grid from "./components/Grid";
import Profile from "./components/Profile";
import Subscribe from "./components/Subscribe";
import Gallery from "./components/Gallery";

async function getFeaturedKnives() {
  return (await sanity.fetch(
    groq`*[_type == "knife" && isFeatured]{
      _id,
      name,
      wrap,
      sheath,
      description,
      "coverImageUrl": coverImage.asset->url,
      "galleryImageUrls": galleryImages[].asset->url,
    }`
  )) as Knife[];
}

async function getKnives() {
  return (await sanity.fetch(
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
  )) as Knife[];
}

export default async function Home() {
  const featuredKnivesData = await getFeaturedKnives();
  const knivesData = await getKnives();

  const [featuredKnives, knives]: [featuredKnives: Knife[], knives: Knife[]] =
    await Promise.all([featuredKnivesData, knivesData]);

  return (
    <>
      <Grid classes="relative border-neutral-200 w-full">
        <h1 className="col-span-full lg:col-start-2 lg:col-end-5 text-4xl md:text-5xl 2xl:text-6xl font-light font-inter tracking-[-0.06em] lg:tracking-[-0.065em] -my-2.5 lg:-my-3 2xl:-my-3.5 -ml-0.5 md:-ml-1.5 max-w-[1400px]">
          Hartsfield-inspired blades, carefully crafted, one at a time
        </h1>
      </Grid>
      {featuredKnives.length ? (
        <Grid>
          <h2 className="col-span-full lg:col-span-1 text-lg text-neutral-200 -my-1 z-10">
            Featured Work
          </h2>
          <Grid
            cols="grid-cols-4 lg:grid-cols-3"
            span="col-span-full lg:col-span-3"
          >
            {featuredKnives?.map((knife, index) => (
              <Profile
                key={knife._id}
                index={index}
                name={knife.name}
                wrap={knife.wrap}
                sheath={knife.sheath}
                imageUrls={
                  knife.galleryImageUrls
                    ? [knife.coverImageUrl, ...knife.galleryImageUrls]
                    : [knife.coverImageUrl]
                }
                description={knife.description}
                cols={{ mobile: 4, desktop: 3 }}
              />
            ))}
          </Grid>
        </Grid>
      ) : null}
      <Grid>
        <h2 className="col-span-full lg:col-span-1 text-lg text-neutral-200 -my-1">
          News
        </h2>
        <Grid
          span="col-span-full lg:col-span-3"
          cols="grid-cols-4 lg:grid-cols-3"
          gap="gap-y-12 gap-x-6"
        >
          <div className="group flex flex-col gap-6 col-span-full">
            <h2 className="hover:underline decoration-2 underline-offset-2 font-light tracking-[-0.05em] text-2xl lg:text-3xl -my-1 lg:-my-2 -ml-0.5 leading-10">
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
        <h2 className="col-span-full lg:col-span-1 text-lg text-neutral-200 -my-1">
          All Work
        </h2>
        <Gallery knives={knives} />
      </Grid>
    </>
  );
}
