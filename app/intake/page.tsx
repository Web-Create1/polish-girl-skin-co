import type { Metadata } from "next";
import IntakeForm from "@/components/IntakeForm";
import { CALENDLY, EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Skincare Intake Form · Polish Girl Skin Co.",
  description:
    "Tell Nicole about your skin, your goals, and your routine so your Polish Girl Skin Co. consultation can be personalized just for you.",
};

export default function IntakePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* slim header */}
      <header className="border-b border-plum/10 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <a href="/" className="group flex items-center gap-2.5" aria-label="Polish Girl Skin Co. home">
            <img
              src="/logo-mark.png"
              alt="Polish Girl Skin Co."
              width={40}
              height={40}
              className="h-10 w-10 rounded-full ring-1 ring-plum/15 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display text-lg leading-none text-plumdeep">
              Polish Girl <span className="text-clay">Skin Co.</span>
            </span>
          </a>
          <a href="/" className="text-sm font-medium text-espresso/70 transition-colors hover:text-plum">
            Back to site
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        {/* intro */}
        <div className="text-center">
          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center">
            <img src="/logo-mark.png" alt="" width={80} height={80} className="h-20 w-20 rounded-full ring-1 ring-plum/15" />
          </div>
          <p className="eyebrow text-clay">Skincare Intake</p>
          <h1 className="mt-5 text-balance text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] text-plumdeep">
            Let us get to know your skin.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-espresso/75">
            A few questions so Nicole can personalize your consultation: your
            skin, your goals, your routine, and your budget. There are no wrong
            answers, and no judgment here.
          </p>
          <p className="mt-5 text-sm text-espresso/55">
            Prefer to book a time first?{" "}
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="font-medium text-plum underline decoration-clay/50 underline-offset-4 hover:text-clay">
              Schedule on Calendly
            </a>
          </p>
        </div>

        <div className="mt-14">
          <IntakeForm />
        </div>
      </main>

      {/* slim footer */}
      <footer className="border-t border-plum/10 py-10 text-center text-sm text-espresso/55">
        <p>
          Questions?{" "}
          <a href={`mailto:${EMAIL}`} className="font-medium text-plum hover:text-clay">
            {EMAIL}
          </a>
        </p>
        <p className="mt-2">© {2026} Polish Girl Skin Co.</p>
      </footer>
    </div>
  );
}
