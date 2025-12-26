import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "education",
  title: "Education",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "University",
      title: "University",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "faculty",
      title: "Faculty",
      type: "string",
      description: "e.g., Faculty of Computers and Information",
    }),
    defineField({
      name: "degree",
      title: "Degree",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gpa",
      title: "GPA",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "graduationDate",
      title: "Graduation Date",
      type: "string",
      description: "Year of graduation (e.g., 2023)",
    }),
    defineField({
      name: "achievements",
      title: "Key Highlights",
      type: "array" as const,
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "University",
      degree: "degree",
      date: "graduationDate",
    },
    prepare({ title, degree, date }) {
      return {
        title: title || "Unknown University",
        subtitle: `${degree || "No Degree"} | ${date || "N/A"}`,
      };
    },
  },
});
