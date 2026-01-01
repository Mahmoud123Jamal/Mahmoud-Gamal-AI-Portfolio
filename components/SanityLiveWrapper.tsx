"use client";

import { useEffect, useState, type ComponentType } from "react";

export default function SanityLiveWrapper() {
  const [SanityLiveComponent, setSanityLiveComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    // Dynamically import SanityLive only on the client side
    import("@/sanity/lib/live")
      .then((mod) => {
        setSanityLiveComponent(() => mod.SanityLive);
      })
      .catch((err) => {
        console.warn("SanityLive failed to load, continuing without live updates:", err);
        // Silently fail - live updates are optional
      });
  }, []);

  if (!SanityLiveComponent) {
    return null;
  }

  return <SanityLiveComponent />;
}

