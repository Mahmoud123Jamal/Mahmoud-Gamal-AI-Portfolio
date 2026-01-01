import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export default defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Professional Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headlineStaticText",
      title: "Headline Static Text",
      type: "string",
      initialValue: "I build",
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      options: {
        rows: 3,
      } as any,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "fullBio",
      title: "Full Bio",
      type: "array" as const,
      of: [{ type: "block" }],
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image" as const,
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt Text" }],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object" as const,
      fields: [
        { name: "github", title: "GitHub", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "website", title: "Website", type: "url" },
      ],
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "stats",
      title: "Profile Statistics",
      type: "array" as const,
      of: [
        {
          type: "object" as const,
          fields: [
            {
              name: "label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "value",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "firstName", subtitle: "headline", media: "profileImage" },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "No Name",
        subtitle: subtitle || "No Headline",
        media: media,
      };
    },
  },
});
