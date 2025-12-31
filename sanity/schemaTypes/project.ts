import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short one-liner about the project",
      validation: (Rule) => Rule.max(150),
    }),
    // ADDED DESCRIPTION FIELD BELOW
    defineField({
      name: "description",
      title: "Project Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image" as const,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array" as const,
      of: [{ type: "string" }],
      description: "e.g., React 19, Next.js 15, Drizzle",
    }),
    defineField({
      name: "category",
      title: "Project Category",
      type: "string",
      options: {
        list: [
          { title: "Web Integrated With AI", value: "Web Integrated With AI" },
          { title: "MERN Stack", value: "MERN Stack" },
          { title: "Web Application", value: "Web App" }, // Matches "Web App" in your JSON
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "liveDemo",
      title: "Live Demo URL",
      type: "url",
    }),
    defineField({
      name: "github",
      title: "GitHub Repository URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "coverImage",
      category: "category",
      featured: "featured",
    },
    prepare(selection) {
      const { title, media, category, featured } = selection;
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: category || "Uncategorized",
        media,
      };
    },
  },
});
