# Divya Land

A small, cinematic birthday website for Divya (Sonu): eight illustrated chapters, hand-made interactions, and one very long letter. Built to feel like a scrapbook you can walk through, not a greeting card.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm run start
```

Requires Node.js 20.9+ (built with Next.js 16, React 19 and Tailwind CSS v4).

## The eight chapters

1. **The Invitation** — an envelope gate, then the opening garden.
2. **The Divya Files** — two versions of Sonu, with playful stat cards.
3. **The Positive Overthinking Centre** — a thought mixer that turns worries into kinder thoughts.
4. **Sonu's Little Café** — brew an order and get a tiny note in return.
5. **The Little Things** — six scrapbook memories in an illustrated timeline.
6. **The Many Worlds of Sonu** — five interactive worlds through the artist, the voice, the strong one, the responsible one, and all of her at once. Paint, hold the mic, part the wind, gather the little things, then bring every side together.
7. **A Letter for Sonu** — break the wax seal, read the letter, seal it back.
8. **The Grand Birthday Finale** — light the candles, make a wish, blow them out, find the gift, replay the world.

Everything is original illustration/CSS/SVG. No stock photos.

## Make it yours

Most copy lives in `src/data/`:

| File | Controls |
| --- | --- |
| `site.ts` | Name, nickname, tagline, music path, chapter labels and navigation |
| `personality.ts` | The two Divya files and their traits |
| `thoughts.ts` | Positive-overthinking prompts |
| `cafe.ts` | Café menu, orders and responses |
| `memories.ts` | Scrapbook memories, captions, stamps and notes |
| `worlds.ts` | The five worlds, captions and interaction prompts |
| `gallery.ts` | Finale copy |
| `letter.ts` | Envelope labels, the full letter and modal UI text |

### Add music

Put a licensed/original track at `public/music/theme.mp3` and set:

```ts
music: {
  src: "/music/theme.mp3",
  title: "a small theme for Sonu",
  volume: 0.32,
}
```

Music is always user-started (never autoplay). If the file is missing or cannot play, the site falls back to a soft generated ambient soundscape.

### Change the palette

Design tokens, keyframes, paper textures and reduced-motion rules live in `src/app/globals.css` under `@theme`. The current palette is cream, blush, lavender, peach, butter, rose, sage and plum.

## Deploy

The whole experience is a single static route, so any Next.js host works.

**Vercel** (recommended)

```bash
npx vercel
```

or push the repo to GitHub and import it at [vercel.com/new](https://vercel.com/new). No environment variables are required.

**Netlify**

```bash
npm run build
npx netlify deploy --prod --dir=.next
```

In the Netlify UI, set the build command to `npm run build` and install the official Next.js runtime (`@netlify/plugin-nextjs`) so SSR/prerendering is handled correctly.

**Any Node host**

```bash
npm ci
npm run build
npm run start
```

The server listens on `PORT` (default `3000`).

## Notes

- Mobile-first: tested at 360, 375, 390 and 414px, with 44px touch targets and no horizontal scroll.
- Respects `prefers-reduced-motion`: animations and the rangoli draw resolve to their final state.
- Smooth scrolling uses Lenis; letter modal locks page scroll and restores focus on close.
- The soundtrack toggle is available on the invitation screen and stays with you throughout. Audio is never autoplay.
- Candles can be blown out by tapping any candle or the button beneath the cake.
- The page is a static route and can be deployed to Vercel, Netlify or any Next.js host.

This project uses a newer Next.js version with breaking changes. If you edit framework code, read the bundled docs in `node_modules/next/dist/docs/` and the notes in `AGENTS.md` first.
