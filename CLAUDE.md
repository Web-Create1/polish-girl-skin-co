@AGENTS.md

# Polish Girl Skin Co.

Marketing site for Nicole Kaminski's personalized skincare concierge + sisterhood (funds the future L.I.L.A. Safe Haven). Client work.
**Status:** active · **Focus:** post-launch polish, client feedback rounds

## Commands
```bash
npm run dev                                        # Turbopack dev server
npm run build                                      # prod build (Turbopack; ESLint no longer runs here)
vercel --prod --yes --scope erics-projects-177e122d   # deploy — --scope is REQUIRED (no default non-interactively)
```

## Map
- `app/` — App Router pages + `globals.css` (`@theme` design tokens)
- `components/` — all section components; single-page scrollytelling site
- `public/hero.jpg` — lavender-field hero image (Ken Burns + parallax)

## Conventions & gotchas
- Stack: Next.js 16 (App Router), Tailwind v4, Framer Motion, Lenis smooth scroll.
- Palette is 60-30-10: cream `#fbf2f7` dominant · plum `#5b2d54` / deep `#2a1430` structure · accent magenta `#d4458a` (token `clay`) + orchid `#9a5fae` (token `gold`). Token names are legacy — REUSE them; new Tailwind v4 tokens may not generate utilities (`bg-magenta` never did).
- Turbopack dev serves stale `@theme` CSS after `globals.css` edits: `rm -rf .next/dev` + restart; verify palette changes in the built CSS, not the dev preview.
- `typescript.ignoreBuildErrors: true` is set — a green build proves nothing about types.
- No em dashes in visible copy (house rule).

## Links
- Repo (private): https://github.com/Web-Create1/polish-girl-skin-co · Live: https://polish-girl-skin-co.vercel.app
- Vercel: project `polish-girl-skin-co`, team scope `erics-projects-177e122d`
- Wiki: [[Polish Girl Skin Co]] · Client: Nicole Kaminski (nmka@uoregon.edu, IG @polishgirlskinco — handle unverified)
