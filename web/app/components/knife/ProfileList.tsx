"use client";

import type { Knife } from "../../types/knife";
import React from "react";
import { motion } from "framer-motion";

import Profile from "./Profile";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function ProfileList({ knives }: { knives: Knife[] }) {
  return (
    <motion.ul
      variants={container}
      className={`
        grid grid-cols-4 gap-y-12 gap-x-6 col-span-full
      `}
    >
      {knives?.map((knife, index) => (
        <motion.li key={knife._id} variants={item} className="col-span-full">
          <Profile
            index={index}
            name={knife.name}
            wrap={knife.wrap}
            sheath={knife.sheath}
            imageUrls={
              knife.galleryImageUrls
                ? [knife.coverImageUrl, ...knife.galleryImageUrls]
                : [knife.coverImageUrl]
            }
            description={knife.description}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
}
