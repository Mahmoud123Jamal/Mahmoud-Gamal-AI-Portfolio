"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Code2 } from "lucide-react";

export default function ProjectCard({
  project,
  index,
}: {
  project: any;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <Code2 size={40} />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {project.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm font-medium text-blue-500">
          {project.tagline}
        </p>
        <p className="mt-3 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech: string) => (
            <span
              key={tech}
              className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
          <Link
            href={project.github}
            target="_blank"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <Github size={18} /> Source
          </Link>
          {project.liveDemo && (
            <Link
              href={project.liveDemo}
              target="_blank"
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Live Demo <ExternalLink size={16} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
