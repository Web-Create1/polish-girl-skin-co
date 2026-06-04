const items = [
  "Judgment-Free",
  "Education-Forward",
  "Trauma-Aware",
  "Rooted in Compassion",
  "Real-Life Expertise",
];

export default function Marquee() {
  const track = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden border-y border-plum/10 bg-sand/60 py-5">
      <div className="flex shrink-0 animate-marquee items-center whitespace-nowrap will-change-transform">
        {track.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="font-display text-xl text-plum/85 sm:text-2xl">{t}</span>
            <span className="mx-7 text-gold sm:mx-9">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
