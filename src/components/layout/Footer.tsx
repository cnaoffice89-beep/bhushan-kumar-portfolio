"use client";

import { footerLinks, personal, contact } from "@/data";
import { scrollToSection } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-space-black/80 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 text-center">
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              {personal.name}
            </h3>
            <p className="mt-1 text-sm text-white/50">{personal.title}</p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-white/60 transition-colors hover:text-cyan-glow focus-ring rounded"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href={contact.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 transition-colors hover:text-cyan-glow focus-ring rounded"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={contact.email.mailto}
                  className="text-sm text-white/60 transition-colors hover:text-cyan-glow focus-ring rounded"
                >
                  Email
                </a>
              </li>
            </ul>
          </nav>

          <p className="text-xs text-white/30">
            © 2026 {personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
