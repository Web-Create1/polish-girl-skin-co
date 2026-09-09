# Polish Girl Skin Co.

Marketing site for a personalized skincare concierge service. Single-page
scrollytelling build with a dedicated `/inner-circle` membership page.

## Stack

- [Next.js 16](https://nextjs.org) — App Router, Turbopack
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) and [Lenis](https://lenis.darkroom.engineering/) smooth scroll

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
```

## Structure

| Path | Contents |
| --- | --- |
| `app/` | Routes, root layout, `globals.css` design tokens |
| `components/` | Page sections; `components/ui/` shared primitives |
| `lib/site.ts` | Outbound links and contact details, single-sourced |
| `next.config.ts` | Security response headers (CSP, X-Frame-Options, ...) |

## Deployment

Deployed on Vercel; `main` is the production branch.
