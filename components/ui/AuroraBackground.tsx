import { cn } from "@/lib/cn";

/**
 * AuroraBackground: vibrant drifting mesh of pink / violet / magenta light.
 * Pure CSS (drifting blurred blobs + a slow conic sweep), so it renders on the
 * server and costs no JS. Honors prefers-reduced-motion via globals.css.
 */
export default function AuroraBackground({
  className,
  intensity = "default",
}: {
  className?: string;
  intensity?: "soft" | "default" | "bold";
}) {
  const opacity =
    intensity === "bold" ? "opacity-90" : intensity === "soft" ? "opacity-50" : "opacity-70";

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", opacity, className)}
    >
      {/* slow conic sweep */}
      <div className="absolute -inset-[40%] animate-aurora-spin bg-[conic-gradient(from_0deg_at_50%_50%,rgba(212,69,138,0.35),rgba(139,92,246,0.32),rgba(224,122,166,0.3),rgba(154,95,174,0.34),rgba(212,69,138,0.35))] blur-[60px]" />
      {/* drifting vibrant blobs */}
      <span className="absolute left-[8%] top-[12%] h-72 w-72 animate-floaty rounded-full bg-magenta/45 blur-[70px]" />
      <span className="absolute right-[6%] top-[24%] h-80 w-80 animate-floaty-slow rounded-full bg-grape/45 blur-[80px]" />
      <span className="absolute bottom-[8%] left-[34%] h-72 w-72 animate-floaty rounded-full bg-rose/45 blur-[70px]" />
      <span className="absolute bottom-[18%] right-[24%] h-60 w-60 animate-floaty-slow rounded-full bg-orchid/40 blur-[64px]" />
    </div>
  );
}
