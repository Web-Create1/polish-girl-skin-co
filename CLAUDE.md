@AGENTS.md

# Polish Girl Skin Co.

Single-page marketing site for a personalized skincare concierge service, plus a
`/inner-circle` membership page. Scrollytelling layout; every section is its own
component.

## Commands

```bash
npm install
npm run dev      # Turbopack dev server on http://localhost:3000
npm run build    # production build (Turbopack; ESLint does not run in build)
npm run start    # serve the production build
```

## Map

- `app/` — App Router entry, `layout.tsx`, `globals.css` (`@theme` design tokens), `/inner-circle`
- `components/` — page sections; `components/ui/` holds shared primitives
- `lib/site.ts` — outbound links and contact details, single-sourced
- `next.config.ts` — security response headers (CSP, X-Frame-Options, etc.)
- `public/` — hero frames, video, and imagery

## Conventions

- Stack: Next.js 16 (App Router), Tailwind v4, Framer Motion, Lenis smooth scroll.
- Palette is 60-30-10: cream `#fbf2f7` dominant, plum `#5b2d54` / deep `#2a1430`
  structure, magenta `#d4458a` (token `clay`) and orchid `#9a5fae` (token `gold`)
  accents. The token names are legacy; reuse them rather than adding new Tailwind
  v4 color tokens (some do not generate utilities).
- Turbopack dev can serve stale `@theme` CSS after `globals.css` edits:
  `rm -rf .next/dev` and restart; trust the production CSS.
- `typescript.ignoreBuildErrors: true` is set, so a green build does not prove types.
- No em dashes in visible copy.
