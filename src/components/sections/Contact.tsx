"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { contact, personal } from "@/data";
import { ParticleCanvas } from "@/components/effects";
import { SectionHeading, MagneticButton } from "@/components/ui";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (formData: FormData) => {
    const newErrors: Record<string, string> = {};

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!message?.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          projectType: formData.get("projectType"),
          message: formData.get("message"),
        }),
      });

      // Server response ko safely read karna
      const responseText = await response.text();

      let result: {
        success?: boolean;
        message?: string;
        id?: string;
      };

      try {
        result = responseText
          ? JSON.parse(responseText)
          : {
              success: false,
              message: `Server returned an empty response (HTTP ${response.status}).`,
            };
      } catch {
        result = {
          success: false,
          message: `Server returned an invalid response (HTTP ${response.status}).`,
        };
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || `Request failed with HTTP ${response.status}.`
        );
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative section-padding overflow-hidden"
      aria-label="Contact section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#042f3a] via-[#021a24] to-space-black" />

      <ParticleCanvas variant="ocean" density={35} />

      <div
        className="absolute inset-0 opacity-15"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(34,211,238,0.2) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          title="Let's Build Something"
          subtitle="For Automation • Development • Freelance Projects"
          badge="Contact"
        />

        <div className="mx-auto max-w-3xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
            noValidate
          >
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm text-white/70"
                >
                  Name *
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  className={cn(
                    "w-full rounded-lg border bg-black/30 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-cyan-glow/50 focus:outline-none focus:ring-1 focus:ring-cyan-glow/30",
                    errors.name ? "border-crimson/50" : "border-white/10"
                  )}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />

                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-1 text-xs text-crimson"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm text-white/70"
                >
                  Email *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  className={cn(
                    "w-full rounded-lg border bg-black/30 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-cyan-glow/50 focus:outline-none focus:ring-1 focus:ring-cyan-glow/30",
                    errors.email ? "border-crimson/50" : "border-white/10"
                  )}
                  placeholder="your@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />

                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-1 text-xs text-crimson"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm text-white/70"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-cyan-glow/50 focus:outline-none focus:ring-1 focus:ring-cyan-glow/30"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              {/* Project Type */}
              <div>
                <label
                  htmlFor="projectType"
                  className="mb-1.5 block text-sm text-white/70"
                >
                  Project Type
                </label>

                <select
                  id="projectType"
                  name="projectType"
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white transition-colors focus:border-cyan-glow/50 focus:outline-none focus:ring-1 focus:ring-cyan-glow/30"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select project type
                  </option>

                  {contact.form.projectTypes.map((type) => (
                    <option key={type} value={type} className="bg-space-deep">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm text-white/70"
                >
                  Message *
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={cn(
                    "w-full resize-none rounded-lg border bg-black/30 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-cyan-glow/50 focus:outline-none focus:ring-1 focus:ring-cyan-glow/30",
                    errors.message ? "border-crimson/50" : "border-white/10"
                  )}
                  placeholder="Tell me about your project..."
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />

                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-1 text-xs text-crimson"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <MagneticButton
                variant="primary"
                className="w-full"
                ariaLabel="Send message"
                type="submit"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </MagneticButton>

              {/* Success */}
              {status === "success" && (
                <p className="text-center text-sm text-green-400" role="status">
                  Message sent successfully! Thank you for contacting me.
                </p>
              )}

              {/* Error */}
              {status === "error" && (
                <p className="text-center text-sm text-crimson" role="alert">
                  Unable to send your message. Please try again.
                </p>
              )}
            </div>
          </motion.form>

          {/* Location */}
          <div className="mt-8 text-center">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <span className="font-mono text-xs text-white/40">Location</span>

              <p className="mt-1 text-white">{personal.location.city}</p>

              <p className="text-sm text-white/50">{personal.location.area}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
