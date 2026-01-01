import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";
if (!token) {
  console.warn(
    "SANITY_API_WRITE_TOKEN is missing. Contact form submissions will fail."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Enable CDN for better performance and reliability
  token,
  perspective: "published",
  stega: {
    enabled: false,
  },
  fetch: {
    cache: "no-store",
    next: { revalidate: 0 },
  },
  requestTagPrefix: "sanity",
});
