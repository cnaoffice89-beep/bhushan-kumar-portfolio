"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ParticleCanvasProps = {
  variant?: "space" | "ocean" | "cyber" | "mixed";
  density?: number;
  className?: string;
  mouseReactive?: boolean;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
};

export function ParticleCanvas({
  variant = "space",
  density = 80,
  className = "",
  mouseReactive = true,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  const getColors = useCallback(() => {
    switch (variant) {
      case "ocean":
        return ["#06b6d4", "#22d3ee", "#0ea5e9", "#38bdf8", "#67e8f9"];
      case "cyber":
        return ["#3b82f6", "#6366f1", "#22d3ee", "#818cf8"];
      case "mixed":
        return ["#22d3ee", "#3b82f6", "#06b6d4", "#7c3aed", "#67e8f9"];
      default:
        return ["#ffffff", "#22d3ee", "#3b82f6", "#94a3b8", "#e2e8f0"];
    }
  }, [variant]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = getColors();
    const particleCount = reducedMotion ? Math.floor(density * 0.3) : density;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const drawShootingStar = () => {
      if (Math.random() > 0.998 && !reducedMotion) {
        const startX = Math.random() * canvas.offsetWidth;
        const startY = Math.random() * canvas.offsetHeight * 0.5;
        const length = Math.random() * 80 + 40;
        const angle = Math.PI / 4;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(
          startX + Math.cos(angle) * length,
          startY + Math.sin(angle) * length
        );
        const gradient = ctx.createLinearGradient(
          startX,
          startY,
          startX + Math.cos(angle) * length,
          startY + Math.sin(angle) * length
        );
        gradient.addColorStop(0, "rgba(255,255,255,0.8)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particlesRef.current.forEach((p) => {
        if (mouseReactive && !reducedMotion) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            p.x -= dx * 0.0005;
            p.y -= dy * 0.0005;
          }
        }

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      drawShootingStar();
      animFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });
    if (mouseReactive) {
      canvas.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [density, getColors, mouseReactive, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
