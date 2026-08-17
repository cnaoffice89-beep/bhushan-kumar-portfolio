"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data";
import type { Project } from "@/types";
import { ParticleCanvas } from "@/components/effects";
import {
  SectionHeading,
  ExpandableModal,
  CaseStudySection,
  MagneticButton,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative section-padding overflow-hidden"
      aria-label="Projects section"
    >
      {/* Space-to-ocean transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-black via-[#0a1a3a] to-[#042f3a]" />
      <ParticleCanvas variant="mixed" density={50} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          title="Project Universe"
          subtitle="Things I've Built"
          badge="Portfolio"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedProject(project)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border text-left transition-all duration-500 focus-ring",
                project.featured
                  ? "border-cyan-glow/30 bg-gradient-to-br from-cyan-glow/5 to-electric/5 shadow-[0_0_40px_rgba(34,211,238,0.1)] lg:col-span-2"
                  : "border-white/10 bg-white/5 hover:border-cyan-glow/20"
              )}
            >
              {/* Visual area */}
              <div
                className={cn(
                  "relative overflow-hidden",
                  project.featured ? "h-48 sm:h-56" : "h-40"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/10 via-electric/5 to-violet/10" />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 50%, rgba(34,211,238,0.3) 0%, transparent 50%)",
                  }}
                />
                {project.featured && (
                  <span className="absolute left-4 top-4 rounded-full border border-crimson/40 bg-crimson/10 px-3 py-1 text-xs font-medium text-crimson">
                    Featured Project
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-white/20 sm:text-4xl">
                    {project.title.split(" ")[0]}
                  </span>
                </div>
                {/* Animated glow border */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/50 to-transparent" />
              </div>

              <div className="p-6 sm:p-8">
                <span className="font-mono text-xs text-cyan-glow">
                  {project.category}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-white/40">
                    Role: {project.role}
                  </span>
                  {project.status === "live" ? (
                    <span className="text-xs font-medium text-green-400">
                      ● Live
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-yellow-400/80">
                      Coming Soon
                    </span>
                  )}
                </div>

                <span className="mt-4 inline-block text-xs text-cyan-glow/60 transition-colors group-hover:text-cyan-glow">
                  Click for case study →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Project Case Study Modal */}
      <ExpandableModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title ?? ""}
        className="max-w-3xl"
      >
        {selectedProject && (
          <div>
            <p className="mb-6 text-sm text-cyan-glow">
              {selectedProject.category} • {selectedProject.role}
            </p>

            {selectedProject.caseStudy.overview && (
              <CaseStudySection
                label="Project Overview"
                content={selectedProject.caseStudy.overview}
              />
            )}
            {selectedProject.caseStudy.role && (
              <CaseStudySection
                label="My Role"
                content={selectedProject.caseStudy.role}
              />
            )}
            {selectedProject.caseStudy.technology && (
              <CaseStudySection
                label="Technology"
                content={selectedProject.caseStudy.technology}
              />
            )}
            {selectedProject.caseStudy.built && (
              <CaseStudySection
                label="What I Built"
                content={selectedProject.caseStudy.built}
              />
            )}
            {selectedProject.caseStudy.process && (
              <CaseStudySection
                label="Development Process"
                content={selectedProject.caseStudy.process}
              />
            )}
            {selectedProject.caseStudy.features && (
              <CaseStudySection
                label="Key Features"
                content={selectedProject.caseStudy.features}
              />
            )}
            {selectedProject.caseStudy.result && (
              <CaseStudySection
                label="Result"
                content={selectedProject.caseStudy.result}
              />
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {selectedProject.liveUrl ? (
                <MagneticButton
                  href={selectedProject.liveUrl}
                  external
                  variant="primary"
                  ariaLabel={`Visit live project: ${selectedProject.title}`}
                >
                  Visit Live Project
                </MagneticButton>
              ) : (
                <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-yellow-400/80">
                  Live Link — Coming Soon
                </span>
              )}
            </div>
          </div>
        )}
      </ExpandableModal>
    </section>
  );
}
