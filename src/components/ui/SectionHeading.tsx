"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  badge?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  badge,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-cyan-glow">
          {badge}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-px w-24 bg-gradient-to-r from-transparent via-cyan-glow/50 to-transparent",
          align === "center" && "mx-auto"
        )}
      />
    </motion.div>
  );
}
