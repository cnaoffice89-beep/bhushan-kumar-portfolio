"use client";

import { ReactNode, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
};

export function MagneticButton({
  children,
  onClick,
  href,
  variant = "primary",
  className,
  external,
  ariaLabel,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.15);
      y.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-aqua/20 to-electric/20 border-cyan-glow/50 text-white hover:from-cyan-aqua/30 hover:to-electric/30 hover:border-cyan-glow hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]",
    secondary:
      "bg-transparent border-white/30 text-white/90 hover:border-cyan-glow/50 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]",
    ghost:
      "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20",
  };

  const baseClasses = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 focus-ring",
    variants[variant],
    className
  );

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        style={{ x: springX, y: springY }}
        className={baseClasses}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      className={baseClasses}
      onClick={onClick}
      aria-label={ariaLabel}
      type={type}
    >
      {children}
    </motion.button>
  );
}
