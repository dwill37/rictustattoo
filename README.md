# Rictus Tattoo website

One-page site for Rictus Tattoo, a women-led tattoo and piercing studio in Playa del Carmen.
Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production preview (what visitors get, with optimized images):

```bash
npm run build
npm start          # http://localhost:3000
```

## Where to edit

- `src/content/site.ts`: every fact, all copy, WhatsApp messages, FAQ, and every
  `[PLACEHOLDER: ...]`. Unfilled placeholders show up highlighted in magenta on the page.
- `SHOW_PIERCINGS` (top of `site.ts`): set to `false` to hide the Piercings section,
  its nav link and its FAQ entry.
- `src/content/images.ts`: which photo goes where, plus alt text.
- Opening days for the structured data: `openingDays` in `src/app/layout.tsx`.
- Photos: cropped and renamed copies of `/image` live in `src/assets/img`.
  The originals in `/image` are untouched.

## Structure

- `src/components/sections/`: one component per section.
- `src/components/ui/`: buttons, icons, placeholder renderer.
- `src/lib/grin.ts`: the smile geometry behind the intro and the Dan portrait reveal.
