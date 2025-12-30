import { Suspense } from "react";
import Hero from "@/components/ui/sections/Hero";
import PortfolioContent from "@/components/portfolioContent";
import About from "@/components/ui/sections/About";
import Skills from "@/components/ui/sections/Skills";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 animate-pulse">
        <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
      </div>
    </div>
  );
}

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingFallback />}>
        <PortfolioContent>
          <Hero />
          <About />
          <Skills />
        </PortfolioContent>
      </Suspense>
    </main>
  );
}
