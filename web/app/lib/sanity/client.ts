import { createClient } from "next-sanity";

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.NODE_ENV === "production" ? process.env.SANITY_PRODUCTION_DATASET : process.env.SANITY_DEVELOPMENT_DATASET,
  apiVersion: new Date().toJSON().slice(0, 10),
  useCdn: process.env.NODE_ENV === "production",
});

export { sanityClient };