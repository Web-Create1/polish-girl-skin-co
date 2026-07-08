/**
 * Central place for all outbound links + contact details.
 * Update these once and every component picks up the change.
 */

export const EMAIL = "nmka@uoregon.edu";

/** Calendly scheduling link — used by every "Book" / consultation CTA. */
export const CALENDLY = "https://calendly.com/polishgirlskinco";

/**
 * Linktree hub — Nicole's own link tree, where all of her real intake /
 * membership / contact forms live. Every "get started" / "join" / "form" CTA
 * routes here instead of an on-site form.
 */
export const LINKTREE = "https://linktr.ee/PolishGirlSkinCo";

/**
 * Per-package checkout links.
 *
 * Nicole sets up her own payment processor (a Stripe Payment Link, Square
 * checkout, PayPal, etc.) and pastes each package's URL here. Every package
 * button on the site reads from this object, so turning on live payments later
 * is a one-file change. Until she provides them, each falls back to Calendly so
 * today's "book a consultation first" flow keeps working with no dead buttons.
 */
export const CHECKOUT = {
  starter: CALENDLY,
  ritual: CALENDLY,
  innerCircle: CALENDLY,
} as const;

/** Instagram profile. */
export const IG = "https://www.instagram.com/polishgirlskincompany/";

/** Display version of the IG handle. */
export const IG_HANDLE = "@polishgirlskincompany";
