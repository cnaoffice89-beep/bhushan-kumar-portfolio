"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
};

export function GlassCard({
  children,
  className,
  onClick,
  interactive = false,
}: GlassCardProps) {
  const Component = interactive ? motion.button : motion.div;

  return (
    <Component
      whileHover={interactive ? { scale: 1.02, y: -4 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        "glass-panel glow-border p-6 text-left transition-shadow duration-300",
        interactive &&
          "cursor-pointer hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)] focus-ring",
        className
      )}
      type={interactive ? "button" : undefined}
    >
      {children}
    </Component>
  );
}
