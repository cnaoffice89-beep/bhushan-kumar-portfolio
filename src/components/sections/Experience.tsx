"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { experience } from "@/data";
import { ExpandableModal, SectionHeading } from "@/components/ui";
import type { ExperienceItem } from "@/types";

export function Experience() {
  const [selected, setSelected] = useState<ExperienceItem | null>(null);

  return (
    <section
      id="experience"
      className="relative section-padding overflow-hidden"
      aria-label="Experience section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-space-black via-space-deep to-space-blue/30" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading title="Experience" badge="Professional" />

        <div className="mx-auto max-w-2xl space-y-6">
          {experience.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelected(item)}
              className="group w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all duration-300 hover:border-cyan-glow/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] focus-ring sm:p-8"
            >
              {item.isCurrent && (
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  Current Role
                </span>
              )}

              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                {item.role}
              </h3>
              <p className="mt-1 text-cyan-glow">{item.field}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.focus.slice(0, 5).map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                  >
                    {f}
                  </span>
                ))}
                {item.focus.length > 5 && (
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">
                    +{item.focus.length - 5} more
                  </span>
                )}
              </div>

              <span className="mt-4 inline-block text-xs text-cyan-glow/60 transition-colors group-hover:text-cyan-glow">
                Click to expand →
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <ExpandableModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.role ?? ""}
      >
        {selected && (
          <div className="space-y-4">
            <p className="text-cyan-glow">{selected.field}</p>
            <p className="leading-relaxed">{selected.details}</p>
            <div>
              <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-cyan-glow">
                Focus Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {selected.focus.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-cyan-glow/20 bg-cyan-glow/10 px-3 py-1 text-xs text-cyan-glow"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </ExpandableModal>
    </section>
  );
}
