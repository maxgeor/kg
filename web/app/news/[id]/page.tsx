import type { News } from "../../types/news";

import { sanityClient as sanity } from "../../lib/sanity/client";
import groq from "groq";

import React from "react";
import Link from "next/link";
import Grid from "../../components/Grid";
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

  return (
    <>
      <nav className="col-span-full flex gap-3 -my-1">
        <Link href="/news" className="hover:underline">
          News
        </Link>
        <span className="text-[#777]">/</span>
        <p className="text-[#777] truncate">{newsItem.title}</p>
      </nav>
      <Grid cols="grid-cols-1 lg:grid-cols-4" gap="gap-y-12 gap-x-6">
        <p className="-my-1">{humanizedDate(newsItem._createdAt)}</p>
        <h1 className="text-4xl md:text-5xl font-extralight tracking-[-0.085em] -ml-1 lg:-ml-2 -my-2.5 lg:-my-3.5">
          {newsItem.title}
        </h1>
      </Grid>
      <Grid
        tag="article"
        cols="grid-cols-1 lg:grid-cols-2"
        span="prose col-span-full md:col-span-3 lg:col-start-2 lg:col-span-2"
      >
        <PortableText value={newsItem.content} />
      </Grid>
    </>
  );
}
