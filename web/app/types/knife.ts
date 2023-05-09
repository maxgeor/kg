export type Knife = {
  _id: number;
  name: string;
  wrap: string;
  sheath: string;
  coverImageUrl: string;
  galleryImageUrls?: string[];
  description?: string;
  isFeatured?: boolean;
  isSpecialProject?: boolean;
};