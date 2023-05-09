import { createClient } from "next-sanity";

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: new Date().toJSON().slice(0, 10),
  useCdn: process.env.NODE_ENV === "production",
});

export { sanityClient };