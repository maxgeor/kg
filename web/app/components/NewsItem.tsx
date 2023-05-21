import React from "react";
import Link from "next/link";
import Grid from "./Grid";
import { humanizedDate } from "../utils/formatting";

export default function NewsItem({
  title,
  date,
  slug,
  content,
}: {
  title: string;
  date: string;
  slug: string;
  content: any;
}) {
  const firstParagraph = (content: [{ children: [{ text: string }] }]) =>
    content[0]?.children[0]?.text;

  return (
    <Grid>
      <p className="col-span-full xl:col-span-1 text-white -my-1">
        {humanizedDate(date)}
      </p>
      <Grid
        span="col-span-full xl:col-span-2"
        cols="grid-cols-4"
        gap="gap-y-12 gap-x-6"
      >
        <Link
          href={`/news/${slug}`}
          className="group flex flex-col gap-6 col-span-full"
        >
          <h2 className="group-hover:underline decoration-2 underline-offset-2 font-light tracking-[-0.07em] text-2xl md:text-3xl -my-1 md:-my-1.5 -ml-[3px]">
            {title}
          </h2>
          <p className="line-clamp-2 -my-1 max-w-prose">
            {firstParagraph(content)}
          </p>
        </Link>
      </Grid>
    </Grid>
  );
}
