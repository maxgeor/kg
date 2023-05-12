import React from "react";

export default function ArrowRight({ classes }: { classes?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
    >
      <path
        d="M6 18.6667H5L5 20.6667H6L6 18.6667ZM34 20.6667C34.5523 20.6667 35 20.2189 35 19.6667C35 19.1144 34.5523 18.6667 34 18.6667V20.6667ZM6 20.6667L34 20.6667V18.6667L6 18.6667L6 20.6667Z"
        fill="currentColor"
      />
      <path
        d="M23 8L34.6667 19.6667L23 31.3333"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}
