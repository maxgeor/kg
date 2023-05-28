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
      <Grid className="border-t-[3px] sm:border-t-4 pt-5 sm:pt-6">
        <h1 className="col-span-full lg:col-start-2 text-3xl sm:text-4xl tracking-[-0.08em] font-light -ml-1 -my-2 sm:-my-2.5">
          Kevin
          <br />
          Georgopoulos
        </h1>
      </Grid>
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
