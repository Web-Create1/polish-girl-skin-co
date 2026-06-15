const EMAIL = "nmka@uoregon.edu";
const IG = "https://instagram.com/polishgirlskinco";

const explore = [
  { href: "#story", label: "Our Story" },
  { href: "#service", label: "The Service" },
  { href: "#sisterhood", label: "Sisterhood" },
  { href: "#lila", label: "L.I.L.A. Safe Haven" },
  { href: "#connect", label: "Connect" },
];

export default function Footer() {
  return (
    <footer className="bg-plumdeep text-cream/80">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-[0.72rem] font-medium text-plum">
                PG
              </span>
              <span className="font-display text-lg text-cream">
                Polish Girl <span className="text-goldlight">Skin Co.</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-pretty leading-relaxed text-cream/65">
              Your personal skincare concierge, your sisterhood, and your healing,
              with a portion of every sale building L.I.L.A. Safe Haven.
            </p>
          </div>

          <div>
            <p className="eyebrow text-goldlight">Explore</p>
            <ul className="mt-5 space-y-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-cream/70 transition-colors hover:text-cream">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-goldlight">Connect</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${EMAIL}`} className="text-cream/70 transition-colors hover:text-cream">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={IG} target="_blank" rel="noopener noreferrer" className="text-cream/70 transition-colors hover:text-cream">
                  Instagram @polishgirlskinco
                </a>
              </li>
              <li className="text-cream/55">Nicole Kaminski, Founder</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 text-sm text-cream/50 sm:flex-row">
          <p>© {2026} Polish Girl Skin Co. All rights reserved.</p>
          <p>Made with care, for women healing in their own skin.</p>
        </div>
      </div>
    </footer>
  );
}
