import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  fetch: {
    cache: "no-store",
    next: { revalidate: 0 },
  },
});
