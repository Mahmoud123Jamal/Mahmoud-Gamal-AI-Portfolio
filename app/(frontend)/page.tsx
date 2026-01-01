import Hero from "@/components/ui/sections/Hero";
import About from "@/components/ui/sections/About";
import Skills from "@/components/ui/sections/Skills";
import Projects from "@/components/ui/sections/Projects";
import Contact from "@/components/ui/sections/Contact";

export default async function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
