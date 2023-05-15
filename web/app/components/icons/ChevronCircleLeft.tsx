import React from "react";

export default function ChevronCircleLeft({
  iconColor = "#fff",
  backgroundColor = "#000",
  className,
}: {
  iconColor?: string;
  backgroundColor?: string;
  className?: string;
}) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="28" height="28" rx="14" fill={backgroundColor} />
      <path
        d="M16 20L10 14L16 8"
        stroke={iconColor}
        strokeWidth="1.66667"
        strokeLinecap="square"
      />
    </svg>
  );
}
