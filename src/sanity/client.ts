import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "dku4omlj",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false to ensure fresh data while developing
});
