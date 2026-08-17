"use client";

import { motion } from "framer-motion";
import { interests, resume } from "@/data";
import { ParticleCanvas } from "@/components/effects";
import { SectionHeading } from "@/components/ui";

export function Explore() {
  return (
    <section
      id="explore"
      className="relative section-padding overflow-hidden"
      aria-label="Explore section"
    >
      {/* Ocean + Space mixed environment */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-black via-[#0a1a3a] to-[#042f3a]" />
      <ParticleCanvas variant="mixed" density={40} />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(6,182,212,0.1) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          title={interests.title}
          subtitle={interests.tagline}
          badge="Beyond Engineering"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {interests.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-cyan-glow/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
            >
              <div className="mb-4 h-1 w-8 rounded-full bg-gradient-to-r from-cyan-glow to-electric transition-all group-hover:w-12" />
              <h3 className="font-display text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 flex max-w-md flex-col items-center gap-4 text-center"
        >
          {resume.available && resume.viewUrl ? (
            <a
              href={resume.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-cyan-glow transition-all hover:border-cyan-glow hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] focus-ring"
            >
              View Resume
            </a>
          ) : (
            <span className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white/40">
              Resume — Coming Soon
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
}
