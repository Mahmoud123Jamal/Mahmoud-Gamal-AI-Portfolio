import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { Download } from "lucide-react";

async function About() {
  try {
    const { data: profileData } = await sanityFetch({ query: HERO_QUERY });

    if (!profileData) return null;

    return (
    <div className="text-white px-6 md:px-16 py-20 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 ">
            About Me
          </h2>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm md:text-base">
            Know more about me
          </p>
        </div>

        <div className="text-black text-lg md:text-xl leading-relaxed text-justify md:text-left">
          {Array.isArray(profileData.fullBio) ? (
            <PortableText value={profileData.fullBio} />
          ) : (
            <p>{profileData.fullBio}</p>
          )}
        </div>

        <div className="pt-5">
          <a
            href="https://drive.google.com/drive/folders/1ZJo7OfEwOwHc7ZvRYspsvTtQ2xWzVQif?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0077b5] hover:bg-[#0077b9] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-teal-500/20 hover:-translate-y-1"
          >
            <Download className="w-5 h-5" />
            Download CV
          </a>
        </div>
      </div>
    </div>
    );
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}

export default About;
