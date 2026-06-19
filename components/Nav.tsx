"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CALENDLY } from "@/lib/site";

const links = [
  { href: "/#story", label: "Story" },
  { href: "/#service", label: "The Service" },
  { href: "/#sisterhood", label: "Sisterhood" },
  { href: "/inner-circle", label: "Inner Circle" },
  { href: "/#lila", label: "L.I.L.A." },
  { href: "/#connect", label: "Connect" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-plum/10 bg-cream/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Polish Girl Skin Co. home">
          <img
            src="/logo-mark.png"
            alt="Polish Girl Skin Co."
            width={40}
            height={40}
            className="h-10 w-10 rounded-full ring-1 ring-plum/15 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-lg leading-none text-plumdeep">
            Polish Girl{" "}
            <span className="text-clay">Skin Co.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm font-medium text-espresso/70 transition-colors hover:text-plum after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-clay after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-plum px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-clay md:inline-block"
        >
          Book a Consult
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`h-px w-6 bg-plumdeep transition-all duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-plumdeep transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-plumdeep transition-all duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-plum/10 bg-cream/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-plum/5 py-3.5 font-display text-lg text-plumdeep"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-4 block rounded-full bg-plum px-5 py-3 text-center text-sm font-medium text-cream"
                >
                  Book a Consultation
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
