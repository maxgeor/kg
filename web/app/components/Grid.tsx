import React, { createElement } from "react";

export default function Grid({
  children,
  tag = "div",
  span = "col-span-full",
  cols = "grid-cols-4",
  gap = "gap-6",
  classes = "",
}: {
  children: React.ReactNode;
  tag?: string;
  span?: string;
  cols?: string;
  gap?: string;
  classes?: string;
}) {
  return createElement(
    tag,
    {
      className: `${span} grid ${cols} ${gap} ${classes}`,
    },
    children
  );
}
