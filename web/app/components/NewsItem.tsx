import React from "react";
import Link from "next/link";
import Image from "next/image";
import Grid from "./Grid";
import { humanizedDate } from "../utils/formatting";

export default function NewsItem({
  title,
  date,
  slug,
  content,
  imageUrl,
  isShowingImage = true,
}: {
  title: string;
  date: string;
  slug: string;
  content: any;
  imageUrl?: string;
  isShowingImage?: boolean;
}) {
  const firstParagraph = (content: [{ children: [{ text: string }] }]) =>
    content[0]?.children[0]?.text;

  return (
    <Grid>
      <p className="col-span-full lg:col-span-1 text-white -my-1">
        {humanizedDate(date)}
      </p>
      <Grid
        span="col-span-full lg:col-span-3"
        cols="grid-cols-1 lg:grid-cols-3"
        gap="gap-y-12 gap-x-6"
      >
        <Link
          href={`/news/${slug}`}
          className="group flex flex-col gap-6 col-span-full lg:col-span-3"
        >
          <h2 className="group-hover:underline decoration-2 underline-offset-2 font-light tracking-[-0.08em] text-2xl md:text-3xl -my-1 md:-my-1.5 -ml-[3px]">
            {title}
          </h2>
          <p className="-my-1 max-w-prose">{firstParagraph(content)}</p>
          {imageUrl && isShowingImage ? (
            <Image
              src={imageUrl}
              alt={title}
              width={1000}
              height={1000}
              className="object-cover aspect-video height-auto w-full h-full "
              priority
            />
          ) : null}
        </Link>
      </Grid>
    </Grid>
  );
}
