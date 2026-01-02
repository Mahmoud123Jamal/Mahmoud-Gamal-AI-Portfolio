import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectCard from "../ProjectCard";
import * as motion from "framer-motion/client";

export default async function Projects() {
  try {
    const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

    if (!projects || projects.length === 0) return null;

    return (
      <section id="projects" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-16 "
          >
            <h2 className="text-4xl text-center md:text-6xl font-bold tracking-tighter text-zinc-900 ">
              My Projects
            </h2>

            <p className="mt-6 text-center text-muted-foreground ">
              A selection of my recent works in AI integration, MERN stack, and
              modern web architectures.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any, index: number) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return null;
  }
}
