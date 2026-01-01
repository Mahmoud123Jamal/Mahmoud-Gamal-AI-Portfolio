import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/lib/queries";
import HeroClient from "./HeroClient";

async function Hero() {
  try {
    const { data: profileData } = await sanityFetch({ query: HERO_QUERY });

    if (!profileData) return null;

    return <HeroClient profileData={profileData} />;
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return null;
  }
}

export default Hero;
