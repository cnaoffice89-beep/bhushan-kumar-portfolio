"use client";

import { motion } from "framer-motion";
import { personal } from "@/data";
import { ParticleCanvas } from "@/components/effects";
import { MagneticButton } from "@/components/ui";
import { useMouseParallax } from "@/hooks";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToSection } from "@/lib/utils";

export function Hero() {
  const offset = useMouseParallax(0.015);
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Deep space background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-black via-space-deep to-space-blue" />

      {/* Nebula effects */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(34,211,238,0.1) 0%, transparent 40%), radial-gradient(ellipse at 60% 80%, rgba(59,130,246,0.08) 0%, transparent 50%)",
        }}
      />

      <ParticleCanvas variant="space" density={100} mouseReactive />

      {/* Energy glow following cursor area */}
      {!reducedMotion && (
        <div
          className="pointer-events-none absolute h-[500px] w-[500px] rounded-full opacity-20 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)",
            transform: `translate(${offset.x * 3}px, ${offset.y * 3}px)`,
            left: "50%",
            top: "40%",
            marginLeft: "-250px",
            marginTop: "-250px",
          }}
        />
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Profile placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border-2 border-cyan-glow/30 bg-gradient-to-br from-cyan-glow/10 to-electric/10 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
          style={{
            transform: reducedMotion
              ? undefined
              : `translate(${offset.x}px, ${offset.y}px)`,
          }}
        >
          <span className="font-display text-2xl font-bold text-gradient">
            BK
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cyan-glow/80"
        >
          Enter the Digital Universe
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          style={{
            transform: reducedMotion
              ? undefined
              : `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)`,
          }}
        >
          {personal.name.toUpperCase()}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-white/80 sm:text-xl"
        >
          {personal.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-2 text-sm text-white/50 sm:text-base"
        >
          {personal.subtitle}
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mx-auto mt-8 max-w-xl border-l-2 border-cyan-glow/40 pl-4 text-left text-base italic text-white/60 sm:text-lg"
        >
          {personal.tagline}
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton
            variant="primary"
            onClick={() => scrollToSection("#projects")}
            ariaLabel="Explore my work"
          >
            Explore My Work
          </MagneticButton>
          <MagneticButton
            variant="secondary"
            onClick={() => scrollToSection("#contact")}
            ariaLabel="Contact Bhushan"
          >
            Let&apos;s Connect
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-cyan-glow/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
