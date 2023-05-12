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
      <h1 className="col-span-full lg:col-start-2 lg:col-end-5 text-3xl md:text-5xl font-light md:font-extralight tracking-[-0.07em] md:tracking-[-0.08em] -ml-1 -my-1.5 md:-my-2">
        Kevin Georgopoulos
      </h1>
      {sections?.map((section) => (
        <Grid key={section.title}>
          <h2 className="col-span-full lg:col-span-1 text-lg -ml-0.5 -my-1">
            {section.title}
          </h2>
          <p
            className={`
            col-span-full -my-1 text-[17px] leading-6
            ${section.imageUrl ? "lg:col-span-2" : "lg:col-span-3"}
          `}
          >
            <PortableText value={section.content} />
          </p>
          {section.imageUrl ? (
            <Image
              src={section.imageUrl}
              alt={`${section.title} image`}
              width={1000}
              height={1000}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
                aspectRatio: "1/1",
              }}
              priority
            />
          ) : null}
        </Grid>
      ))}
    </>
  );
}
