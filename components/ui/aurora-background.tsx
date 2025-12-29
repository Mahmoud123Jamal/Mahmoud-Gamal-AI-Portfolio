"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex min-h-screen flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ backgroundPosition: "50% 50%, 50% 50%" }}
            animate={{
              backgroundPosition: ["50% 50%, 50% 50%", "350% 50%, 350% 50%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%),
                repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)
              `,
              backgroundSize: "300%, 200%",
            }}
            className={cn(
              `
              pointer-events-none
              absolute -inset-[10px] opacity-50 blur-[10px] will-change-transform
              after:content-[""] after:absolute after:inset-0 
              after:mix-blend-difference
              invert dark:invert-0
              `,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
            )}
          ></motion.div>
        </div>
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </main>
  );
};
