import type { Knife } from "./types/knife";

import { sanityClient as sanity } from "./lib/sanity/client";
import groq from "groq";

import Grid from "./components/Grid";
import Card from "./components/knife/Card";
import Profile from "./components/knife/Profile";
import Subscribe from "./components/Subscribe";

async function getKnives(): Promise<Knife[]> {
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
async function getFeaturedKnives(): Promise<Knife[]> {
  return await sanity.fetch(
    groq`*[_type == "knife" && defined(isFeatured) && isFeatured]{
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

export default async function Home() {
  const featuredKnivesData = await getFeaturedKnives();
  const knivesData = await getKnives();

  const [featuredKnives, knives] = await Promise.all([
    featuredKnivesData,
    knivesData,
  ]);

  return (
    <>
      <Grid classes="relative border-y-2 border-neutral-200 w-full ">
        <h1 className="pt-6 md:py-6 text-neutral-200 col-span-full md:col-start-2 md:col-end-5 text-2xl lg:text-3xl 2xl:text-4xl font-light font-inter tracking-tighter -my-2.5 lg:-my-3 2xl:-my-3.5 -ml-0.5 md:-ml-1.5 max-w-[1400px]">
          Hartsfield-inspired blades, carefully crafted, one at a time
        </h1>
        <div className="pb-2 md:py-2 md:order-first flex md:flex-col justify-between -my-1 col-span-full md:col-span-1">
          <span className="font-mono text-[16px]">00</span>
          <p>Handmade in Canada</p>
        </div>
      </Grid>
      {featuredKnives ? (
        <Grid gap="gap-y-12 gap-x-6" classes="border-t-2">
          <h2 className="col-span-full lg:col-span-1 text-lg lg:text-xl text-neutral-200 -my-1 pt-2">
            Featured Knives
          </h2>
          <Grid
            span="col-span-full lg:col-span-3"
            cols="grid-cols-4 lg:grid-cols-3"
            classes="lg:pt-12"
          >
            {featuredKnives?.map((knife) => (
              <Profile
                key={knife._id}
                name={knife.name}
                wrap={knife.wrap}
                sheath={knife.sheath}
                coverImageUrl={knife.coverImageUrl}
                description={knife.description}
                galleryImageUrls={knife.galleryImageUrls}
                cols={{ mobile: 4, desktop: 3 }}
              />
            ))}
          </Grid>
        </Grid>
      ) : null}
      <Grid gap="gap-y-12 gap-x-6" classes="border-t-2">
        <h2 className="col-span-full lg:col-span-1 text-lg lg:text-xl text-neutral-200 -my-1 pt-2">
          News
        </h2>
        <Grid
          span="col-span-full lg:col-span-3"
          cols="grid-cols-4 lg:grid-cols-3"
          gap="gap-y-12 gap-x-6"
          classes="lg:pt-12"
        >
          <div className="group flex flex-col gap-6 col-span-full lg:col-span-2">
            <h2 className="group-hover:underline decoration-4 font-light tracking-tighter text-2xl leading-[56px] -my-1.5">
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
      <Grid classes="border-t-2">
        <h2 className="col-span-full text-lg lg:text-xl -my-1 text-neutral-200 pt-2">
          All Knives
        </h2>
        <Grid span="col-span-full">
          {knives?.map((knife) => (
            <Card
              key={knife._id}
              name={knife.name}
              wrap={knife.wrap}
              sheath={knife.sheath}
              coverImageUrl={knife.coverImageUrl}
              description={knife.description}
              galleryImageUrls={knife.galleryImageUrls}
              isSpecialProject={knife.isSpecialProject}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
}