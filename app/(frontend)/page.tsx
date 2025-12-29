import Hero from "@/components/ui/sections/Hero";
import PortfolioContent from "@/components/ui/portfolioContent";
import About from "@/components/ui/sections/About";

export default async function Home() {
  try {
    return (
      <>
        <PortfolioContent>
          <Hero />
          <About />
        </PortfolioContent>
      </>
    );
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    return (
      <div className="font-bold text-4xl grid place-content-center">
        somthing went wrong , please connect to internet{" "}
      </div>
    );
  }
}
