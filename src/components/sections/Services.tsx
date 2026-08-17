"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { services, freelanceExperience } from "@/data";
import type { Service } from "@/types";
import { ParticleCanvas } from "@/components/effects";
import { SectionHeading, ExpandableModal } from "@/components/ui";

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section
      id="services"
      className="relative section-padding overflow-hidden"
      aria-label="Services section"
    >
      {/* Deep ocean environment */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#042f3a] via-[#0a4f5c] to-[#021a24]" />
      <ParticleCanvas variant="ocean" density={45} />

      {/* Underwater light rays */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(34,211,238,0.1) 0%, transparent 30%, transparent 70%, rgba(6,182,212,0.05) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          title={freelanceExperience.title}
          badge="Freelance"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 text-center"
        >
          <span className="font-display text-5xl font-bold text-gradient sm:text-6xl">
            {freelanceExperience.duration}
          </span>
          <p className="mt-2 text-white/50">
            {freelanceExperience.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedService(service)}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 text-left transition-all duration-300 hover:border-cyan-aqua/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] focus-ring"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-aqua/30 bg-cyan-aqua/10">
                <span className="font-mono text-sm text-cyan-aqua">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-base font-semibold text-white">
                {service.name}
              </h3>
              <span className="mt-3 inline-block text-xs text-cyan-aqua/60 transition-colors group-hover:text-cyan-aqua">
                Click to expand →
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <ExpandableModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.name ?? ""}
      >
        {selectedService && (
          <p className="leading-relaxed">{selectedService.description}</p>
        )}
      </ExpandableModal>
    </section>
  );
}
