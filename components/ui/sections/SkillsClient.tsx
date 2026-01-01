"use client";
import { Skill } from "@/types/Skill";

import { CategorizedSkills } from "@/types/Skill";
import { motion } from "framer-motion";

export default function SkillsClient({
  skills,
}: {
  skills: CategorizedSkills;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-5" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl text-center mb-8 md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white"
        >
          My Skills
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {(Object.entries(skills) as [keyof CategorizedSkills, Skill[]][]).map(
            ([category, items]) => (
              <motion.div
                key={category}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold mb-6 uppercase border-l-4 border-blue-600 pl-3">
                  {category}
                </h3>

                <div className="space-y-6">
                  {items.map((skill) => (
                    <motion.div key={skill.name} variants={itemVariants}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-bold">{skill.name}</span>
                        <span className="text-sm">{skill.percentage}%</span>
                      </div>

                      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1.2 }}
                          className="h-full"
                          style={{ backgroundColor: skill.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
