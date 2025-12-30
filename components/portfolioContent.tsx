"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function AuroraBackground({
  children,
  showRadialGradient = true,
  className,
}: {
  children: React.ReactNode;
  showRadialGradient?: boolean;
  className?: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={cn("min-h-screen bg-white", className)}>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className={cn("relative min-h-screen bg-white", className)}>
      {showRadialGradient && (
        <div className="absolute inset-0 bg-linear-to-br from-blue-50/20 via-white to-purple-50/20" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function PortfolioContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AuroraBackground showRadialGradient={true} className="py-10">
      {children}
    </AuroraBackground>
  );
}
