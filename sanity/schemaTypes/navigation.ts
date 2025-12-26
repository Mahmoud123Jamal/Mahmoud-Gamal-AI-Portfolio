import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "title",
      title: "Link Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link URL",
      type: "string",
      description: "Page anchor (e.g., '#about') or external URL.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Tabler icon name (e.g., 'IconHome', 'IconBrandGithub')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isExternal",
      title: "External Link",
      type: "boolean",
      description: "Does this link go to an external website?",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (1, 2, 3...)",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "href",
      order: "order",
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${order ?? 0}. ${title || "Untitled Link"}`,
        subtitle: subtitle || "No destination set",
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
