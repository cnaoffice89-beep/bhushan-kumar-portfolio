"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { developmentSkills, personal } from "@/data";
import type { Skill } from "@/types";
import { ParticleCanvas } from "@/components/effects";
import { SectionHeading, ExpandableModal } from "@/components/ui";
import { cn } from "@/lib/utils";

const levelColors: Record<string, string> = {
  "Hands-on": "text-cyan-glow border-cyan-glow/40 bg-cyan-glow/10",
  "Working Knowledge": "text-electric border-electric/40 bg-electric/10",
  "Project Experience": "text-violet border-violet/40 bg-violet/10",
  "Professional Exposure": "text-white/70 border-white/20 bg-white/5",
};

const codeSnippets: Record<string, string> = {
  python: "def automate():\n    return 'systems'",
  javascript: "const build = () => 'web';",
  nextjs: "export default App",
  html: "<section />",
  css: ".core { glow: cyan; }",
  bootstrap: '<div class="container">',
};

export function Development() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <section
      id="development"
      className="relative section-padding overflow-hidden"
      aria-label="Development section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-space-deep via-[#0a0f2e] to-space-black" />
      <ParticleCanvas variant="cyber" density={35} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          title="Development Core"
          subtitle="Full-stack web development & digital systems"
          badge="Digital Laboratory"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-center"
        >
          <div className="glass-panel px-6 py-3">
            <span className="font-mono text-xs text-electric">FOCUS</span>
            <p className="font-display text-sm font-semibold text-white">
              Full-Stack Web Development
            </p>
          </div>
          <div className="glass-panel px-6 py-3">
            <span className="font-mono text-xs text-cyan-glow">EXPERIENCE</span>
            <p className="font-display text-sm font-semibold text-white">
              {personal.freelanceYears} Years Independent Freelance
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {developmentSkills.map((skill, index) => (
            <motion.button
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedSkill(skill)}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 text-left transition-all duration-300 hover:border-electric/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] focus-ring"
            >
              {/* Terminal header */}
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-crimson/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              </div>

              <h3 className="font-display text-lg font-semibold text-white">
                {skill.name}
              </h3>

              <pre className="mt-3 overflow-hidden rounded-lg bg-black/40 p-3 font-mono text-xs text-cyan-glow/70">
                {codeSnippets[skill.id] ?? "// code"}
              </pre>

              <span
                className={cn(
                  "mt-3 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium",
                  levelColors[skill.level]
                )}
              >
                {skill.level}
              </span>

              <span className="mt-3 block text-xs text-white/30 transition-colors group-hover:text-electric/60">
                Click to expand →
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <ExpandableModal
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill?.name ?? ""}
      >
        {selectedSkill && (
          <div className="space-y-4">
            <span
              className={cn(
                "inline-block rounded-full border px-3 py-1 text-xs font-medium",
                levelColors[selectedSkill.level]
              )}
            >
              {selectedSkill.level}
            </span>
            <p className="leading-relaxed">{selectedSkill.description}</p>
            <div>
              <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-electric">
                How It Relates to My Work
              </h4>
              <p className="text-sm leading-relaxed text-white/70">
                {selectedSkill.relation}
              </p>
            </div>
          </div>
        )}
      </ExpandableModal>
    </section>
  );
}
