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
      <Grid span="col-span-full lg:col-start-2 lg:col-end-5">
        <h1 className="text-3xl">These are my one-off experiments</h1>
      </Grid>
      {specialProjects.length ? (
        <Grid gap="gap-6 lg:gap-0">
          <h2 className="cols-span-full text-lg -my-1">Special Projects</h2>
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
                cols={{ mobile: 4, desktop: 3 }}
              />
            ))}
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}
