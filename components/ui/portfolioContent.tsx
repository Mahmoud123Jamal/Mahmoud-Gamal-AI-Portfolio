"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function PortfolioContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuroraBackground showRadialGradient={true} className="py-10">
      {children}
    </AuroraBackground>
  );
}
