import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/lib/queries";
import HeroClient from "./HeroClient";

async function Hero() {
  const { data: profileData } = await sanityFetch({ query: HERO_QUERY });

  if (!profileData) return null;

  return <HeroClient profileData={profileData} />;
}

export default Hero;
