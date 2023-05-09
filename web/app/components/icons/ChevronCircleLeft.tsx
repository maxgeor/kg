import React from "react";

export default function ChevronCircleLeft({
  shape = "circle",
  classes,
}: {
  shape?: "circle" | "square";
  classes?: string;
}) {
  if (shape === "square") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" fill="currentColor" />
        <path
          d="M13.5 17L8.5 12L13.5 7"
          stroke="black"
          stroke-width="1.66667"
          stroke-linecap="square"
        />
      </svg>
    );
  }
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
    >
      <rect width="24" height="24" rx="12" fill="currentColor" />
      <path
        d="M13.5 17L8.5 12L13.5 7"
        stroke="black"
        stroke-width="1.66667"
        stroke-linecap="square"
      />
    </svg>
  );
}
