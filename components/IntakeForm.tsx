"use client";

import { useState } from "react";

/* ---------------------------------------------------------------------------
   Polish Girl Skin Co. — skincare intake form (UI only).
   The markup is wired with proper name/id attributes so a backend
   (Web3Forms, Resend, etc.) can be connected later. For now submit is
   intercepted client side and shows a friendly "not connected yet" notice.
--------------------------------------------------------------------------- */

const contactMethods = ["Email", "Text", "Instagram DM"];

const services = [
  {
    value: "Full Skincare Consultation",
    label: "Full Skincare Consultation",
    meta: "45 to 60 minutes",
    desc: "A full analysis of your skin, lifestyle, and goals. Includes a customized routine, product recommendations, and budget friendly options.",
  },
  {
    value: "Mini Skin Check",
    label: "Mini Skin Check",
    meta: "15 minutes",
    desc: "Quick support for one focused issue: an acne flare, dryness, ingredient questions, or routine confusion.",
  },
  {
    value: "Product Audit",
    label: "Product Audit",
    meta: "Upload your products",
    desc: "Share your current products and I will review what to keep, replace, or avoid, then suggest better alternatives for your skin type.",
  },
  {
    value: "The Full Reset",
    label: "The Full Reset",
    meta: "The complete overhaul",
    desc: "A total skincare overhaul: full analysis, customized routine, product recommendations, budget planning, shopping links, and a follow up check in.",
  },
];

const skinTypes = ["Dry", "Oily", "Combination", "Sensitive", "Normal", "Not sure"];

const concerns = [
  "Acne",
  "Texture",
  "Hyperpigmentation",
  "Fine lines / wrinkles",
  "Dryness",
  "Oiliness",
  "Redness",
  "Sensitivity",
  "Dark circles",
  "Uneven tone",
];

const budgets = [
  "Under $50 / month",
  "$50 to $100 / month",
  "$100 to $200 / month",
  "$200+ / month",
  "I do not know yet",
];

const preferences = [
  "Drugstore products",
  "High-end products",
  "A mix",
  "I am open to anything",
];

const formats = [
  "Video Call",
  "Phone Call",
  "Instagram Video Chat",
  "Written recommendations only (email)",
];

const availability = [
  "Weekday Mornings",
  "Weekday Afternoons",
  "Weekday Evenings",
  "Weekends",
  "Flexible / Anytime",
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

export default function IntakeForm() {
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
        <h2 className="mt-6 font-display text-3xl text-plumdeep">Thank you, beautiful.</h2>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-espresso/75">
          Your answers look great. Heads up: this form is a preview and is not
          connected to send yet, so nothing was submitted. Once it is live,
          Nicole will personally review your intake and reach out.
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
          <Field label="Phone number" htmlFor="phone" hint="Optional">
            <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputBase} placeholder="(555) 555-5555" />
          </Field>
          <Field label="Instagram handle" htmlFor="instagram" hint="If you prefer DM communication">
            <input id="instagram" name="instagram" type="text" className={inputBase} placeholder="@yourhandle" />
          </Field>
        </div>
        <Field label="Preferred contact method">
          <div className="grid gap-3 sm:grid-cols-3">
            {contactMethods.map((m) => (
              <label key={m} className={optionCard}>
                <input type="radio" name="contactMethod" value={m} className="mt-0.5 accent-magenta" />
                <span>{m}</span>
              </label>
            ))}
          </div>
        </Field>
      </Section>

      {/* SECTION 2 — PICK YOUR SERVICE */}
      <Section step="2" title="Pick your service" intro="Choose the one that fits where you are right now.">
        <div className="grid gap-3">
          {services.map((s) => (
            <label key={s.value} className={optionCard}>
              <input type="radio" name="service" value={s.value} className="mt-1 accent-magenta" />
              <span className="flex-1">
                <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="font-display text-lg text-plumdeep">{s.label}</span>
                  <span className="text-xs uppercase tracking-wide text-clay">{s.meta}</span>
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-espresso/70">{s.desc}</span>
              </span>
            </label>
          ))}
        </div>
      </Section>

      {/* SECTION 3 — YOUR SKIN PROFILE */}
      <Section step="3" title="Your skin profile">
        <Field label="How would you describe your skin type?">
          <div className="grid gap-3 sm:grid-cols-3">
            {skinTypes.map((t) => (
              <label key={t} className={optionCard}>
                <input type="radio" name="skinType" value={t} className="mt-0.5 accent-magenta" />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </Field>

        <Field label="What are your top skincare concerns?" hint="Select all that apply">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {concerns.map((c) => (
              <label key={c} className={optionCard}>
                <input type="checkbox" name="concerns" value={c} className="mt-0.5 accent-magenta" />
                <span>{c}</span>
              </label>
            ))}
          </div>
          <input
            type="text"
            name="concernsOther"
            className={`${inputBase} mt-3`}
            placeholder="Other — feel free to describe in detail"
          />
        </Field>

        <Field label="Do you have any known allergies or ingredient sensitivities?" htmlFor="allergies">
          <textarea id="allergies" name="allergies" rows={3} className={inputBase} placeholder="List anything I should steer clear of" />
        </Field>

        <div className="grid gap-7 sm:grid-cols-2">
          <Field label="Are you currently using any skincare products?">
            <div className="grid grid-cols-2 gap-3">
              {["Yes", "No"].map((v) => (
                <label key={v} className={optionCard}>
                  <input type="radio" name="usingProducts" value={v} className="mt-0.5 accent-magenta" />
                  <span>{v}</span>
                </label>
              ))}
            </div>
          </Field>
          <Field label="Product photos" htmlFor="productPhotos" hint="Optional — for a Product Audit or Full Reset">
            <input
              id="productPhotos"
              name="productPhotos"
              type="file"
              accept="image/*"
              multiple
              className="w-full rounded-xl border border-dashed border-plum/25 bg-ivory px-4 py-3 text-sm text-espresso/70 file:mr-4 file:rounded-full file:border-0 file:bg-plum file:px-4 file:py-2 file:text-sm file:font-medium file:text-cream hover:file:bg-clay"
            />
          </Field>
        </div>

        <Field label="If yes, list the products you are currently using." htmlFor="currentProducts">
          <textarea id="currentProducts" name="currentProducts" rows={3} className={inputBase} placeholder="Cleanser, moisturizer, SPF, treatments..." />
        </Field>
      </Section>

      {/* SECTION 4 — BUDGET & PREFERENCES */}
      <Section step="4" title="Budget and preferences">
        <Field label="What is your skincare budget?">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {budgets.map((b) => (
              <label key={b} className={optionCard}>
                <input type="radio" name="budget" value={b} className="mt-0.5 accent-magenta" />
                <span>{b}</span>
              </label>
            ))}
          </div>
        </Field>

        <Field label="Do you prefer:">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {preferences.map((p) => (
              <label key={p} className={optionCard}>
                <input type="radio" name="preference" value={p} className="mt-0.5 accent-magenta" />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </Field>

        <Field label="Anything else you want me to know about your skin or goals?" htmlFor="notes">
          <textarea id="notes" name="notes" rows={4} className={inputBase} placeholder="Tell me anything that helps me care for you well" />
        </Field>
      </Section>

      {/* SECTION 5 — SCHEDULE */}
      <Section step="5" title="Schedule">
        <Field label="Preferred consultation format">
          <div className="grid gap-3 sm:grid-cols-2">
            {formats.map((f) => (
              <label key={f} className={optionCard}>
                <input type="radio" name="format" value={f} className="mt-0.5 accent-magenta" />
                <span>{f}</span>
              </label>
            ))}
          </div>
        </Field>

        <Field label="When are you usually available?" hint="Select all that apply">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {availability.map((a) => (
              <label key={a} className={optionCard}>
                <input type="checkbox" name="availability" value={a} className="mt-0.5 accent-magenta" />
                <span>{a}</span>
              </label>
            ))}
          </div>
        </Field>
      </Section>

      <div className="flex flex-col items-center gap-4 pt-2">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum px-8 py-4 text-sm font-medium tracking-wide text-cream shadow-[0_18px_50px_-12px_rgba(91,45,84,0.6)] transition-colors hover:bg-clay sm:w-auto sm:px-12"
        >
          Submit intake form
          <span aria-hidden>→</span>
        </button>
        <p className="text-center text-sm text-espresso/55">
          Your information stays private and is only used to personalize your care.
        </p>
      </div>
    </form>
  );
}
