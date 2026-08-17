"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { automationSkills } from "@/data";
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

export function Automation() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section
      id="automation"
      className="relative section-padding overflow-hidden"
      aria-label="Automation section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-space-black via-[#0a1a2e] to-space-deep" />
      <ParticleCanvas variant="cyber" density={30} />

      {/* Industrial grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          title="Automation Core"
          subtitle="Industrial control systems & automation technology"
          badge="Automation Command Center"
        />

        {/* Central core visualization */}
        <div className="relative mx-auto mb-16 flex h-64 items-center justify-center sm:h-80">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute h-48 w-48 rounded-full border border-cyan-glow/20 sm:h-64 sm:w-64"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute h-36 w-36 rounded-full border border-dashed border-electric/20 sm:h-48 sm:w-48"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-cyan-glow/40 bg-space-deep/80 shadow-[0_0_60px_rgba(34,211,238,0.2)] sm:h-36 sm:w-36"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-glow/60">
              Core
            </span>
            <span className="font-display text-sm font-bold text-white sm:text-base">
              AUTO
            </span>
            <span className="font-mono text-[10px] text-white/40">SYS</span>
          </motion.div>

          {/* Connection lines to active node */}
          {activeNode && (
            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                x1="50%"
                y1="50%"
                x2="50%"
                y2="20%"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1"
              />
            </svg>
          )}
        </div>

        {/* Technology nodes grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {automationSkills.map((skill, index) => (
            <motion.button
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => {
                setSelectedSkill(skill);
                setActiveNode(skill.id);
              }}
              onMouseEnter={() => setActiveNode(skill.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={cn(
                "group relative rounded-xl border p-4 text-left transition-all duration-300 focus-ring",
                activeNode === skill.id
                  ? "border-cyan-glow/50 bg-cyan-glow/10 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                  : "border-white/10 bg-white/5 hover:border-cyan-glow/30"
              )}
            >
              <div className="mb-2 flex h-2 w-2 rounded-full bg-cyan-glow shadow-[0_0_6px_rgba(34,211,238,0.6)]">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="h-full w-full rounded-full bg-cyan-glow"
                />
              </div>
              <h3 className="text-sm font-semibold text-white">{skill.name}</h3>
              <span
                className={cn(
                  "mt-2 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium",
                  levelColors[skill.level]
                )}
              >
                {skill.level}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <ExpandableModal
        isOpen={!!selectedSkill}
        onClose={() => {
          setSelectedSkill(null);
          setActiveNode(null);
        }}
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
              <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-cyan-glow">
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
