import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      options: { rows: 3 },
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "siteKeywords",
      title: "Site Keywords",
      type: "array" as const,
      of: [{ type: "string" }],
    }),
    defineField({
      name: "siteLogo",
      title: "Site Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "primaryColor",
      title: "Primary Color",
      type: "string",
    }),
    defineField({
      name: "secondaryColor",
      title: "Secondary Color",
      type: "string",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
    }),
    defineField({
      name: "ctaText",
      title: "Main CTA Text",
      type: "string",
    }),
    defineField({
      name: "ctaUrl",
      title: "Main CTA URL",
      type: "string",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
    }),
    defineField({
      name: "twitterHandle",
      title: "Twitter Handle",
      type: "string",
    }),
    defineField({
      name: "footer",
      title: "Footer Settings",
      type: "object" as const,
      fields: [
        { name: "text", title: "Footer Text", type: "text" },
        { name: "copyrightText", title: "Copyright", type: "string" },
        {
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string" },
                { name: "url", type: "string" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "maintenanceMode",
      title: "Maintenance Mode",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "maintenanceMessage",
      title: "Maintenance Message",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "siteTitle",
      media: "siteLogo",
    },
  },
});
