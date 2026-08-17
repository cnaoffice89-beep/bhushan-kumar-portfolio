"use client";

import { motion } from "framer-motion";
import { certificates, projects } from "@/data";
import { SectionHeading } from "@/components/ui";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative section-padding overflow-hidden"
      aria-label="Certifications section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#021a24] via-space-deep to-space-black" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          title="Certifications & Credentials"
          badge="Credentials"
        />

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-violet/30 bg-violet/10">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-violet"
                  />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold text-white">
                {cert.name}
              </h3>
              {cert.status === "coming-soon" && (
                <span className="mt-2 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400/80">
                  Coming Soon
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Project-based achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <h3 className="mb-8 text-center font-display text-xl font-semibold text-white">
            Project-Based Achievements
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <span className="font-mono text-xs text-cyan-glow">
                  {project.category}
                </span>
                <h4 className="mt-1 font-display text-sm font-semibold text-white">
                  {project.title}
                </h4>
                <p className="mt-1 text-xs text-white/50">{project.role}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
