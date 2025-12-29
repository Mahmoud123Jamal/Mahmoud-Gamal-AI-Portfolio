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
