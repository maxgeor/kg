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
    }`
  );
}

export default async function News() {
  const news: News[] = await getNews();

  if (!news) return <div>No news yet</div>;

  return (
    <>
      {news.map((newsItem) => (
        <NewsItem
          key={newsItem._id}
          title={newsItem.title}
          date={newsItem._createdAt}
          slug={newsItem.slug}
          content={newsItem.content}
          imageUrl={newsItem.imageUrl}
        />
      ))}
      <Subscribe span="col-span-full lg:col-start-2 lg:col-end-5" />
    </>
  );
}
