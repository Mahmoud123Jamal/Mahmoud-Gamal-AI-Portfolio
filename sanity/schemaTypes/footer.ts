import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer Settings",
  type: "document",
  fields: [
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      initialValue: `© ${new Date().getFullYear()} Eng. Mahmoud Gamal. All rights reserved.`,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array" as const,
      of: [
        {
          type: "object" as const,
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "URL / Path", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array" as const,
      description: "Links to display in the footer (e.g., GitHub, LinkedIn)",
      of: [
        {
          type: "object" as const,
          fields: [
            { 
              name: "platform", 
              title: "Platform Name", 
              type: "string",
              description: "e.g., 'GitHub', 'LinkedIn'"
            },
            { 
              name: "url", 
              title: "URL", 
              type: "url" 
            },
            {
              name: "icon",
              title: "Icon Image",
              type: "image",
              options: { hotspot: true }
            }
          ],
        },
      ],
    }),
    defineField({
      name: "newsletterHeadline",
      title: "Newsletter Headline",
      type: "string",
      description: "Optional text for a newsletter signup section",
    }),
  ],
});