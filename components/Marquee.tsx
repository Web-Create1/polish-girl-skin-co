import VelocityMarquee from "@/components/ui/VelocityMarquee";

const items = [
  "Judgment Free",
  "Education Forward",
  "Trauma Aware",
  "Rooted in Compassion",
  "Real Life Expertise",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-plum/10 bg-[linear-gradient(90deg,#f6e6f1,#f9d4e8,#efe6f6,#f6e6f1)] py-5">
      <VelocityMarquee baseVelocity={2.2}>
        {items.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="font-display text-xl text-plum/90 sm:text-2xl">{t}</span>
            <span className="mx-7 text-magenta sm:mx-9">✦</span>
          </span>
        ))}
      </VelocityMarquee>
    </div>
  );
}
