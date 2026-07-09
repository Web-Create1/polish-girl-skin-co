"use client";

import { useEffect, useState } from "react";
import CinematicHero from "@/components/CinematicHero";
import DesktopVideoHero from "@/components/DesktopVideoHero";
import HeroPoster from "@/components/HeroPoster";

/**
 * HeroSwitch: viewport-aware hero picker.
 *   desktop (≥1024px) → DesktopVideoHero (autoplay cinematic video)
 *   mobile  (<1024px) → CinematicHero    (the existing scroll-scrub)
 *
 * Server render and the first client render both return HeroPoster (the
 * "pending" state), so hydration matches exactly — no mismatch warning. Only
 * the chosen hero then mounts, so the heavy work (video download on desktop,
 * 60-frame preload on mobile) never runs on the device that won't show it.
 */
export default function HeroSwitch() {
  const [mode, setMode] = useState<"pending" | "desktop" | "mobile">("pending");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setMode(mq.matches ? "desktop" : "mobile");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (mode === "pending") return <HeroPoster />;
  return mode === "desktop" ? <DesktopVideoHero /> : <CinematicHero />;
}
