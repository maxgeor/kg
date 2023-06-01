import type { News } from "../types/news";

import { sanityClient as sanity } from "../lib/sanity/client";
import groq from "groq";

import React from "react";
import NewsItem from "../components/NewsItem";
import Subscribe from "../components/Subscribe";

async function getNews() {
  return await sanity.fetch(
    groq`*[_type == "news"] | order(_createdAt desc) {
      _id,
      title,
      'slug': slug.current,
      content,
      _createdAt,
      "imageUrl": image.asset->url,
    }`,
    { next: { tags: ["news"] } }
  );
}

export default async function News() {
  const news: News[] = await getNews();

  return (
    <>
      {news?.length ? (
        news.map((newsItem) => (
          <NewsItem
            key={newsItem._id}
            title={newsItem.title}
            date={newsItem._createdAt}
            slug={newsItem.slug}
            content={newsItem.content}
            imageUrl={newsItem.imageUrl}
          />
        ))
      ) : (
        <p className="col-span-full lg:col-span-1 -my-1">No news yet</p>
      )}
      <Subscribe span="col-span-full lg:col-start-2 " />
    </>
  );
}
