import { sanityClient as sanity } from "../lib/sanity/client";
import groq from "groq";

import React from "react";
import Grid from "../components/Grid";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

interface AboutPageSection {
  title: string;
  content: [];
  imageUrl?: string;
}

async function getAboutPageContent() {
  return await sanity.fetch(
    groq`*[_type == "about"]{
      _id,
      title,
      content,
      "imageUrl": image.asset->url,
    }`
  );
}

export default async function About() {
  const sections: AboutPageSection[] = await getAboutPageContent();

  return (
    <>
      <h1 className="col-span-full lg:col-span-1 text-3xl sm:text-4xl md:text-5xl xl:text-7xl tracking-[-0.085em] font-extralight -ml-1 -my-1.5 md:-my-2">
        Kevin
        <br />
        Georgopoulos
      </h1>
      {sections?.map((section) => (
        <Grid key={section.title}>
          <h2 className="col-span-full lg:col-span-1 -my-0.5">
            {section.title}
          </h2>
          {section.imageUrl ? (
            <Image
              src={section.imageUrl}
              alt={`${section.title} image`}
              width={1000}
              height={1000}
              className="col-span-full lg:col-span-1"
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
                aspectRatio: "1/1",
              }}
              priority
            />
          ) : null}
          <div className="col-span-full lg:col-span-2 col-span-full -my-1">
            <PortableText value={section.content} />
          </div>
        </Grid>
      ))}
    </>
  );
}
