import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export default defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "AI/ML", value: "ai-ml" },
          { title: "Database", value: "database" },
          { title: "Tools", value: "tools" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "proficiency",
      title: "Proficiency Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "Expert", value: "expert" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "percentage",
      title: "Proficiency Percentage",
      type: "number",
      description: "0-100 for visual progress bars",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "color",
      title: "Brand Color",
      type: "string",
      description: "Hex color code (e.g., #61DAFB)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      level: "proficiency",
    },
    prepare({ title, subtitle, level }) {
      return {
        title: title || "New Skill",
        subtitle: `${subtitle} | ${level}`,
      };
    },
  },
});
