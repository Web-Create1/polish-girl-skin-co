"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

type Orb = {
  left: string;
  top: string;
  size: number;
  depth: number; // 0 = far, 1 = near: drives parallax strength + blur
  from: string;
  to: string;
  opacity: number;
};

const ORBS: Orb[] = [
  { left: "10%", top: "22%", size: 150, depth: 0.35, from: "#f0bcd6", to: "#d4458a", opacity: 0.55 },
  { left: "76%", top: "16%", size: 210, depth: 0.7, from: "#c9a3e6", to: "#8b5cf6", opacity: 0.5 },
  { left: "64%", top: "60%", size: 170, depth: 0.5, from: "#f7d8e7", to: "#e07aa6", opacity: 0.5 },
  { left: "20%", top: "64%", size: 120, depth: 0.85, from: "#ffffff", to: "#d9b8ec", opacity: 0.6 },
  { left: "44%", top: "30%", size: 90, depth: 1, from: "#fbe3f0", to: "#f0bcd6", opacity: 0.5 },
  { left: "88%", top: "48%", size: 130, depth: 0.45, from: "#e07aa6", to: "#9a5fae", opacity: 0.45 },
];

/**
 * FloatingOrbs3D: depth-sorted glass orbs that parallax toward the pointer in
 * real CSS 3D (perspective + translateZ on the outer node), while a nested
 * child drifts on its own CSS keyframe so the two transforms compose instead of
 * fighting. Static + centered under prefers-reduced-motion.
 */
export default function FloatingOrbs3D() {
  const reduce = useReducedMotion();
  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2);
      py.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [px, py, reduce]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [perspective:1200px] [transform-style:preserve-3d]"
    >
      {ORBS.map((o, i) => (
        <OrbView key={i} orb={o} px={px} py={py} reduce={!!reduce} index={i} />
      ))}
    </div>
  );
}

function OrbView({
  orb,
  px,
  py,
  reduce,
  index,
}: {
  orb: Orb;
  px: ReturnType<typeof useMotionValue<number>>;
  py: ReturnType<typeof useMotionValue<number>>;
  reduce: boolean;
  index: number;
}) {
  const shift = 46 * orb.depth;
  const x = useTransform(px, [-1, 1], [-shift, shift]);
  const y = useTransform(py, [-1, 1], [-shift, shift]);

  return (
    <motion.span
      // outer node: pointer parallax + depth (framer owns this transform)
      style={
        reduce
          ? { left: orb.left, top: orb.top, width: orb.size, height: orb.size }
          : { left: orb.left, top: orb.top, width: orb.size, height: orb.size, x, y, translateZ: orb.depth * 120 }
      }
      className="absolute [transform-style:preserve-3d]"
    >
      {/* inner node: independent CSS drift, composes with the parent transform */}
      <span
        className={reduce ? "block h-full w-full rounded-full" : "block h-full w-full animate-floaty rounded-full"}
        style={{
          opacity: orb.opacity,
          background: `radial-gradient(circle at 32% 28%, ${orb.from}, ${orb.to})`,
          filter: `blur(${(1 - orb.depth) * 8 + 2}px)`,
          boxShadow: `0 30px 80px -20px ${orb.to}66, inset 0 0 40px rgba(255,255,255,0.25)`,
          animationDelay: `${index * 0.7}s`,
          animationDuration: `${8 + index}s`,
        }}
      />
    </motion.span>
  );
}
