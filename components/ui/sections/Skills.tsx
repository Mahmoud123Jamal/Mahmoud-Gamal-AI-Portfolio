import { sanityFetch } from "@/sanity/lib/live";
import { CATEGORIZED_SKILLS_QUERY } from "@/sanity/lib/queries";
import SkillsClient from "./SkillsClient";

export default async function Skills() {
  try {
    const { data: categorizedSkills } = await sanityFetch({
      query: CATEGORIZED_SKILLS_QUERY,
    });

    if (!categorizedSkills) return null;

    return <SkillsClient skills={categorizedSkills} />;
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return null;
  }
}
