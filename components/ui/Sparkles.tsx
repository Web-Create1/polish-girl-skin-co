"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type SparklesProps = {
  className?: string;
  /** particles per 100k px² of canvas area */
  density?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  colors?: string[];
};

type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; da: number; c: string };

/**
 * Sparkles: lightweight canvas particle field (21st.dev "sparkles" pattern).
 * DPR-aware, area-capped, pauses when offscreen, and renders nothing when the
 * user prefers reduced motion. No dependencies beyond the canvas API.
 */
export default function Sparkles({
  className,
  density = 26,
  minSize = 0.6,
  maxSize = 1.8,
  speed = 0.5,
  colors = ["#ffffff", "#f7d8e7", "#f0bcd6", "#d9b8ec"],
}: SparklesProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: P[] = [];
    let w = 0;
    let h = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      const area = w * h;
      const count = Math.min(220, Math.round((area / 100000) * density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: minSize + Math.random() * (maxSize - minSize),
        vx: (Math.random() - 0.5) * speed * 0.4,
        vy: (Math.random() - 0.5) * speed * 0.4,
        a: Math.random(),
        da: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        c: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.da;
        if (p.a <= 0.05 || p.a >= 1) p.da *= -1;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.a));
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(tick);
      },
      { threshold: 0 }
    );

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density, minSize, maxSize, speed, colors]);

  return <canvas ref={ref} className={cn("pointer-events-none absolute inset-0", className)} aria-hidden />;
}
