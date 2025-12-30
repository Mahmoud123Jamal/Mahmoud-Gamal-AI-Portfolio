import { defineQuery } from "next-sanity";

export const HERO_QUERY = defineQuery(`
    *[_type == "profile" && _id == "singleton-profile"][0] {
      firstName,
      lastName,
      headline,
      headlineStaticText,
      shortBio,
      fullBio,
      email,
      phone,
      location,
      yearsOfExperience,
      stats,
      socialLinks,
      "fullName": firstName + " " + lastName,
      profileImage {
      asset->,
      alt
    }
    }
  `);

export const CATEGORIZED_SKILLS_QUERY = defineQuery(`
  {
    "frontend": *[_type == "skill" && category == "frontend"] | order(percentage desc),
    "backend": *[_type == "skill" && category == "backend"] | order(percentage desc),
    "database": *[_type == "skill" && category == "database"] | order(percentage desc),
    "tools": *[_type == "skill" && category == "tools"] | order(percentage desc)
  }
`);
