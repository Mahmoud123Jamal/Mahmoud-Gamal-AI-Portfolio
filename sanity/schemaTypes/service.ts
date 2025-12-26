import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export default defineType({
  name: "service",
  title: "Services",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
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
      name: "icon",
      title: "Icon/Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      options: {
        rows: 2,
      },
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "array" as const,
      of: [{ type: "block" }],
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array" as const,
      of: [{ type: "reference", to: [{ type: "skill" }] }],
      description: "Link these to your existing skills in the Studio",
    }),
    defineField({
      name: "featured",
      title: "Featured Service",
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
      media: "icon",
      featured: "featured",
    },
    prepare({ title, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        media: media,
      };
    },
  },
});
