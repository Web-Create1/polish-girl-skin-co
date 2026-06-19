"use client";

import { useState } from "react";

/* ---------------------------------------------------------------------------
   Polish Girl Skin Co. — Inner Circle interest form (UI only).
   The markup is wired with proper name/id attributes so a backend
   (Web3Forms, Resend, etc.) can be connected later. For now submit is
   intercepted client side and shows a friendly "not connected yet" notice.
--------------------------------------------------------------------------- */

const contactMethods = ["Email", "Text", "Instagram DM"];

const fits = [
  {
    value: "Healing & reclaiming myself",
    label: "I am healing and want to feel like myself again",
    desc: "Skincare is part of how you take your power back. You want to look in the mirror and finally love who is looking back.",
  },
  {
    value: "Busy & want it handled",
    label: "I am busy and want this handled for me",
    desc: "Your time is precious. You would love to delegate the shopping and research and just show up glowing.",
  },
  {
    value: "Overwhelmed & need a guide",
    label: "I am overwhelmed and need a trusted guide",
    desc: "There are a million products and zero bandwidth. You want a skincare bestie to take the guesswork off your plate.",
  },
  {
    value: "Pour into everyone else",
    label: "I pour into everyone else and need to refill my own cup",
    desc: "You care for everyone first. You want a little ritual that is just for you, and a community that sees you.",
  },
  {
    value: "Something else",
    label: "Something else",
    desc: "Your story is your own. Tell us a little below and we will meet you exactly where you are.",
  },
];

const hopes = [
  "Community",
  "Connection",
  "Friendships",
  "Fun",
  "Opportunities",
  "Glowing, healthy skin",
];

const inputBase =
  "w-full rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-espresso placeholder:text-espresso/40 transition-colors focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/25";

const optionCard =
  "flex cursor-pointer items-start gap-3 rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-espresso/85 transition-colors hover:border-plum/35 has-[:checked]:border-clay has-[:checked]:bg-blush/40 has-[:checked]:ring-1 has-[:checked]:ring-clay/40";

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-plumdeep">
        {label}
        {required && <span className="ml-0.5 text-clay">*</span>}
      </label>
      {hint && <p className="mt-1 text-sm text-espresso/55">{hint}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Section({
  step,
  title,
  intro,
  children,
}: {
  step: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-3xl bg-ivory p-7 ring-1 ring-plum/10 sm:p-9">
      <legend className="float-none">
        <span className="eyebrow text-clay">Section {step}</span>
        <span className="mt-2 block font-display text-2xl text-plumdeep sm:text-3xl">
          {title}
        </span>
      </legend>
      {intro && <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-espresso/70">{intro}</p>}
      <div className="mt-7 space-y-7">{children}</div>
    </fieldset>
  );
}

export default function InnerCircleForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // UI-only preview: no backend connected yet.
    e.preventDefault();
    setSubmitted(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="rounded-3xl bg-ivory p-10 text-center ring-1 ring-plum/10 sm:p-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush text-3xl text-plum">
          ♡
        </div>
        <h2 className="mt-6 font-display text-3xl text-plumdeep">Welcome, beautiful.</h2>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-espresso/75">
          We cannot wait to meet you. Heads up: this form is a preview and is not
          connected to send yet, so nothing was submitted. Once it is live, Nicole
          will personally reach out and save you a seat in the Inner Circle.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="rounded-full border border-plum/20 px-6 py-3 text-sm font-medium text-plum transition-colors hover:bg-sand"
          >
            Back to the form
          </button>
          <a
            href="/"
            className="rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-clay"
          >
            Return home
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* SECTION 1 — YOUR INFO */}
      <Section step="1" title="Your info">
        <div className="grid gap-7 sm:grid-cols-2">
          <Field label="Full name" htmlFor="fullName" required>
            <input id="fullName" name="fullName" type="text" required autoComplete="name" className={inputBase} placeholder="Your name" />
          </Field>
          <Field label="Email" htmlFor="email" required>
            <input id="email" name="email" type="email" required autoComplete="email" className={inputBase} placeholder="you@email.com" />
          </Field>
          <Field label="Instagram handle" htmlFor="instagram" hint="Optional, if you prefer DM communication">
            <input id="instagram" name="instagram" type="text" className={inputBase} placeholder="@yourhandle" />
          </Field>
          <Field label="Preferred contact method">
            <div className="grid grid-cols-3 gap-3">
              {contactMethods.map((m) => (
                <label key={m} className={optionCard}>
                  <input type="radio" name="contactMethod" value={m} className="mt-0.5 accent-magenta" />
                  <span>{m}</span>
                </label>
              ))}
            </div>
          </Field>
        </div>
      </Section>

      {/* SECTION 2 — WHO YOU ARE */}
      <Section step="2" title="Which of these sounds most like you?" intro="There are no wrong answers. This just helps Nicole care for you well.">
        <div className="grid gap-3">
          {fits.map((f) => (
            <label key={f.value} className={optionCard}>
              <input type="radio" name="fit" value={f.value} className="mt-1 accent-magenta" />
              <span className="flex-1">
                <span className="font-display text-lg text-plumdeep">{f.label}</span>
                <span className="mt-1 block text-sm leading-relaxed text-espresso/70">{f.desc}</span>
              </span>
            </label>
          ))}
        </div>
      </Section>

      {/* SECTION 3 — WHAT YOU ARE HOPING FOR */}
      <Section step="3" title="What are you hoping to find here?" intro="Select everything that calls to you.">
        <Field label="The Inner Circle is many things" hint="Select all that apply">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hopes.map((h) => (
              <label key={h} className={optionCard}>
                <input type="checkbox" name="hopes" value={h} className="mt-0.5 accent-magenta" />
                <span>{h}</span>
              </label>
            ))}
          </div>
        </Field>

        <Field label="Anything else you would like Nicole to know?" htmlFor="notes">
          <textarea id="notes" name="notes" rows={4} className={inputBase} placeholder="Tell us a little about where you are and what you are looking for. This is a soft place to land." />
        </Field>
      </Section>

      <div className="flex flex-col items-center gap-4 pt-2">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum px-8 py-4 text-sm font-medium tracking-wide text-cream shadow-[0_18px_50px_-12px_rgba(91,45,84,0.6)] transition-colors hover:bg-clay sm:w-auto sm:px-12"
        >
          Save my seat in the Inner Circle
          <span aria-hidden>→</span>
        </button>
        <p className="text-center text-sm text-espresso/55">
          Your information stays private and is only used to welcome you in.
        </p>
      </div>
    </form>
  );
}
