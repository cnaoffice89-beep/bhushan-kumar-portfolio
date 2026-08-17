"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personal, timeline, education } from "@/data";
import { ParticleCanvas } from "@/components/effects";
import { SectionHeading, GlassCard, ExpandableModal } from "@/components/ui";
import type { TimelineItem } from "@/types";

export function About() {
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineItem | null>(
    null
  );
  const [educationOpen, setEducationOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative section-padding overflow-hidden"
      aria-label="About section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-space-blue/50 via-space-deep to-space-black" />
      <ParticleCanvas variant="space" density={40} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading title="My Journey" badge="About" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="text-lg leading-relaxed text-white/70">
            {personal.about}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-2xl">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-glow/50 via-electric/30 to-transparent" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-12 flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <button
                onClick={() => setSelectedTimeline(item)}
                className={`group w-[calc(50%-2rem)] text-left focus-ring rounded-xl ${
                  index % 2 === 0 ? "mr-auto" : "ml-auto"
                }`}
              >
                <div className="glass-panel p-5 transition-all duration-300 group-hover:border-cyan-glow/30 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                  <span className="font-mono text-xs text-cyan-glow">
                    {item.year}
                  </span>
                  <h3 className="mt-1 font-display text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">{item.summary}</p>
                  <span className="mt-2 inline-block text-xs text-cyan-glow/60 transition-colors group-hover:text-cyan-glow">
                    Click to expand →
                  </span>
                </div>
              </button>

              <div className="absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-cyan-glow bg-space-black shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            </motion.div>
          ))}
        </div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-16 max-w-lg"
        >
          <GlassCard
            interactive
            onClick={() => setEducationOpen(true)}
            className="text-center"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-glow">
              Education
            </span>
            <h3 className="mt-2 font-display text-lg font-semibold text-white">
              {education.degree}
            </h3>
            <p className="mt-1 text-sm text-white/50">
              Graduated {education.graduation} • CGPA {education.cgpa}
            </p>
            <span className="mt-3 inline-block text-xs text-cyan-glow/60">
              Click for details →
            </span>
          </GlassCard>
        </motion.div>
      </div>

      <ExpandableModal
        isOpen={!!selectedTimeline}
        onClose={() => setSelectedTimeline(null)}
        title={selectedTimeline?.title ?? ""}
      >
        {selectedTimeline && (
          <>
            <p className="mb-2 font-mono text-sm text-cyan-glow">
              {selectedTimeline.year}
            </p>
            <p className="leading-relaxed">{selectedTimeline.details}</p>
          </>
        )}
      </ExpandableModal>

      <ExpandableModal
        isOpen={educationOpen}
        onClose={() => setEducationOpen(false)}
        title="Education"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-glow">
              Degree
            </h4>
            <p>{education.degree}</p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-glow">
              College
            </h4>
            <p>{education.college}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-glow">
                Graduation
              </h4>
              <p>{education.graduation}</p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-glow">
                CGPA
              </h4>
              <p>{education.cgpa}</p>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-glow">
              School
            </h4>
            <p>{education.school}</p>
          </div>
        </div>
      </ExpandableModal>
    </section>
  );
}
