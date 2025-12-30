import { Suspense } from "react";
import Hero from "@/components/ui/sections/Hero";
import PortfolioContent from "@/components/portfolioContent";
import About from "@/components/ui/sections/About";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  try {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <PortfolioContent>
          <Hero />
          <About />
        </PortfolioContent>
      </Suspense>
    );
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            Please check your connection and refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
}
