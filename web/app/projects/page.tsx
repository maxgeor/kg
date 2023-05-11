import type { Knife } from "../types/knife";

import { sanityClient as sanity } from "../lib/sanity/client";
import groq from "groq";

import React from "react";
import Grid from "../components/Grid";
import Profile from "../components/Profile";

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
      <h1 className="col-span-full lg:col-start-2 lg:col-end-5 text-2xl md:text-3xl font-light tracking-tighter -ml-0.5 lg:-ml-3 -my-1.5 md:-my-2">
        One-off, experimental knives I don&apos;t plan on making any more of
      </h1>
      {specialProjects.length ? (
        <Grid>
          {specialProjects?.map((project, index) => (
            <Profile
              index={index}
              key={project._id}
              name={project.name}
              wrap={project.wrap}
              sheath={project.sheath}
              imageUrls={
                project.galleryImageUrls
                  ? [project.coverImageUrl, ...project.galleryImageUrls]
                  : [project.coverImageUrl]
              }
              description={project.description}
              isShowingIndex={true}
            />
          ))}
        </Grid>
      ) : null}
    </>
  );
}
