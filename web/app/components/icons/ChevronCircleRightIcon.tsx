import React from "react";

export default function ChevronCircleRightIcon({
  iconColor = "#FFF",
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
        d="M12 20L18 14L12 8"
        stroke={iconColor}
        strokeWidth="1.3333"
        // strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  );
}
