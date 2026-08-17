"use client";

import { ReactNode, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ExpandableModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

export function ExpandableModal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ExpandableModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-cyan-glow/20 bg-space-deep/95 p-6 shadow-[0_0_60px_rgba(34,211,238,0.15)] sm:p-8",
              className
            )}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <h3
                id="modal-title"
                className="font-display text-xl font-bold text-white sm:text-2xl"
              >
                {title}
              </h3>
              <button
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-cyan-glow/50 hover:text-white focus-ring"
                aria-label="Close dialog"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 4L4 12M4 4l8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="text-white/80">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type CaseStudySectionProps = {
  label: string;
  content: string | string[];
};

export function CaseStudySection({ label, content }: CaseStudySectionProps) {
  return (
    <div className="mb-6 last:mb-0">
      <h4 className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-cyan-glow">
        {label}
      </h4>
      {Array.isArray(content) ? (
        <ul className="space-y-2">
          {content.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-glow" />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-relaxed text-white/70">{content}</p>
      )}
    </div>
  );
}
