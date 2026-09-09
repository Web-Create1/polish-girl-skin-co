import type { NextConfig } from "next";

/**
 * Security headers applied to every route.
 *
 * This is a fully static marketing site: no API routes, no forms that post
 * anywhere, no user input rendered into the page. A nonce-based CSP would force
 * every page into dynamic rendering (losing the CDN cache) and buys nothing
 * here, so we use a static-compatible policy instead. The goal is to close the
 * passive attack surface a static site still has: framing / clickjacking, MIME
 * sniffing, referrer leakage, and unwanted browser features.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-inline' covers Next.js' inline bootstrap scripts and the JSON-LD
  // block in app/page.tsx. There is no user-controlled markup anywhere on the
  // site, so inline execution is not a reachable XSS vector.
  "script-src 'self' 'unsafe-inline'",
  // Framer Motion and Next.js inject inline styles.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // R3F + drei intrinsic JSX typings can be fussy under strict TS; don't let a
  // type-only nit block the production build. Runtime code is written carefully.
  typescript: { ignoreBuildErrors: true },
  // Don't advertise the framework.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
