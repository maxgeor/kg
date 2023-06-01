import type { News } from "../../types/news";

import { sanityClient as sanity } from "../../lib/sanity/client";
import groq from "groq";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Grid from "../../components/Grid";
import Subscribe from "@/app/components/Subscribe";
import { PortableText } from "@portabletext/react";
import { humanizedDate } from "@/app/utils/formatting";

async function getNewsItem(slug: string) {
  return await sanity.fetch(
    groq`*[_type == 'news' && slug.current == $slug][0] {
      _id,
      title,
      'slug': slug.current,
      content,
      _createdAt,
      "imageUrl": image.asset->url,
    }`,
    { slug }
  );
}

export default async function NewsItem({ params }) {
  const newsItem: News = await getNewsItem(params.id);
  const humanDate = humanizedDate(newsItem._createdAt);

  return (
    <>
      <Grid
        cols="grid-cols-1 md:grid-cols-4 lg:grid-cols-5"
        gap="gap-y-12 md:gap-y-24 gap-x-6 -mt-12 md:mt-0"
      >
        <nav className="col-span-full md:col-span-1 flex gap-3 -my-1 h-fit">
          <Link href="/news" className="hover:underline">
            News
          </Link>
          <span className="text-[#777]">/</span>
          <p className="text-[#777] truncate">{newsItem.title}</p>
        </nav>
        <Grid
          span="col-span-full md:col-span-3 lg:col-span-4"
          cols="grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
          gap="gap-y-12 gap-x-6"
        >
          <p className="-my-1">{humanDate}</p>
          <h1 className="max-w-prose col-span-full text-2xl md:text-3xl lg:text-4xl font-light tracking-[-0.08em] -ml-1 -my-1.5 md:-my-2 lg:-my-2.5 ">
            {newsItem.title}
          </h1>
          {newsItem.imageUrl ? (
            <Image
              src={newsItem.imageUrl}
              alt={newsItem.title}
              width={1000}
              height={1000}
              className="object-cover aspect-video height-auto w-full h-full col-span-full lg:col-span-3"
              priority
            />
          ) : null}
          <article className=" max-w-prose prose prose-a:underline col-span-full -my-1">
            <PortableText value={newsItem.content} />
          </article>
          <Subscribe
            span="col-span-full md:col-span-4"
            cols="grid-cols-1 md:grid-cols-3"
            className="mt-12"
          />
        </Grid>
      </Grid>
    </>
  );
}
