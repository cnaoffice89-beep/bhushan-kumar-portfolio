"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, personal } from "@/data";
import { useActiveSection } from "@/hooks";
import { cn, scrollToSection } from "@/lib/utils";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionIds = navigation.map((n) => n.id);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : "bg-transparent"
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <button
            onClick={() => handleNavClick("#home")}
            className="group flex items-center gap-2 focus-ring rounded-lg"
            aria-label="Go to home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-glow/30 bg-cyan-glow/10 font-display text-sm font-bold text-cyan-glow transition-all group-hover:border-cyan-glow/60 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              BK
            </div>
            <span className="hidden font-display text-sm font-semibold text-white sm:block">
              {personal.name.split(" ")[0]}
            </span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-wider transition-colors focus-ring",
                    activeSection === item.id
                      ? "text-cyan-glow"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-1 -bottom-0.5 h-px bg-cyan-glow"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 lg:hidden focus-ring"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 bg-white"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-5 bg-white"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 bg-white"
            />
          </button>
        </nav>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-space-black/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col items-center gap-2">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "rounded-lg px-6 py-3 font-display text-lg font-medium uppercase tracking-wider transition-colors focus-ring",
                      activeSection === item.id
                        ? "text-cyan-glow"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
