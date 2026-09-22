# Vitalina Nikulina — Portfolio Hub

The home base for Vitalina Nikulina — designer & front-end engineer who designs in Figma, builds in React + TypeScript + Tailwind, and ships the live site. One person, idea to live, no handoff.

**Live:** https://vitaniko91-lang.github.io/

A single-page hub with a confident opening statement and a Selected Work gallery of twelve shipped projects — each one its own distinct art direction, because the range is the point.

## Selected work

In gallery order. Every card links to the live site; most also link the source, and one carries a public Figma file and a written case study.

| Project | What it is | Art direction | Links |
|---|---|---|---|
| **Ringmeter — Ring Size from One Photo** | Lay a ring beside a 20 mm marker, shoot from above, and the inner diameter comes back in millimetres. OpenCV in a Web Worker, nothing uploaded, $0.00 per image — with a committed test set of 29 real photos and the one systematic error written on the page rather than tuned away. | Lab paper — warm paper · ink · a single teal | [Live](https://ringmeter.vercel.app) · [Code](https://github.com/vitaniko91-lang/ringmeter) |
| **Crucible — Agent Workbench** | A design-time workbench for AI agents: build one on a canvas, then prove it holds — evals, an LLM judge, and version diffs that catch a real policy failure before it ships. | Petrol Chrome — deep petrol · liquid azure | [Live](https://crucible-tau.vercel.app) · [Code](https://github.com/vitaniko91-lang/crucible) |
| **LAST — Care for Things You Keep** | A leather-care brand built from a category audit: a four-question configurator that assembles a kit, prices how long it lasts, and refuses what would harm the material. | Patina — paper · cinematic dark · one teal accent | [Live](https://last-vitaniko91-langs-projects.vercel.app) · [Code](https://github.com/vitaniko91-lang/last) · [Figma](https://www.figma.com/design/ztM2VHMovlutEykLNGPLVq) · [Case](https://last-vitaniko91-langs-projects.vercel.app/case) |
| **TIMBRE — See the Sound** | A fictional premium-audio brand whose hero is a single drop of liquid glass — play a track and it ripples, refracts and re-colors in real time to the sound itself. | Pearl Prism — pearl-white · spectral glass | [Live](https://timbre-ruby.vercel.app) · [Code](https://github.com/vitaniko91-lang/timbre) |
| **TIMBRE Ad System** | The paid-social layer for TIMBRE: six angles, four placements, four layouts and three spectral moods, composed live in the browser and exported as the exact PNGs a media buyer uploads. | Pearl Prism, applied to media | [Live](https://timbre-ads.vercel.app) · [Code](https://github.com/vitaniko91-lang/timbre-ads) |
| **MERIDIAN — Payment, Slowed 4,000×** | The life of a single B2B payment told as one GPU particle river across seven chapters, where scroll drives time rather than space. | Vault Light — black · champagne gold | [Live](https://meridian-settlement.vercel.app) · [Code](https://github.com/vitaniko91-lang/meridian) |
| **FAIRFARE — An Honest Booking Flow** | Ryanair's checkout is a masterclass in dark patterns. I audited the live flow, named every pattern, and rebuilt it without them — keeping each place the airline actually makes money. | Redesign, not rebrand — navy · scarce yellow | [Live](https://fairfare.vercel.app) · [Code](https://github.com/vitaniko91-lang/fairfare) |
| **Relay — AI-Agent Dashboard** | A live observability dashboard for teams running AI agents in production — every run, cost and failure in one place, down to the step-by-step trace. | Dark Ops-Tool — slate · cyan | [Live](https://relay-obs.vercel.app) · [Code](https://github.com/vitaniko91-lang/relay) |
| **Stillpoint — Breathwork App** | A calm breathwork guide you use right in the browser — a live breathing orb, coherence / box / 4-7-8 patterns, and a focused timed session. | Warm Calm — paper · serif | [Live](https://stillpoint-app.vercel.app) · [Code](https://github.com/vitaniko91-lang/stillpoint) |
| **Ollama — Concept Redesign** | Ollama's landing page rebuilt as one living terminal session — every section reads like a command and its output. | Living Terminal — dark · mono | [Live](https://ollama-redesign.vercel.app) · [Code](https://github.com/vitaniko91-lang/ollama-redesign) |
| **Helm — 0→1 Brand & Site** | A fictional boutique AI-agent studio invented end-to-end: brand, voice, and an editorial site that carries itself like a print spread. | Editorial Atelier — light · serif | [Live](https://helm-ai-studio.vercel.app) · [Code](https://github.com/vitaniko91-lang/helm) |
| **Hero Lab — AI Tool** | A real, shipped AI tool: describe a product and get a polished hero section plus the production React and Tailwind code behind it. | Playful Maker — colorful · product | [Live](https://hero-generator.vercel.app) · [Code](https://github.com/vitaniko91-lang/hero-generator) |

The gallery is data, not markup: the single source is `src/data/cases.ts`, and `src/sections/Work.tsx` renders whatever is in it. Adding a project means one entry plus a 1600×1000 WebP in `public/cases/` — the section tests then hold every card to the same contract (live link, at least one artefact beside it, alt text, no nested anchors).

## Tech stack

- **React 19 + TypeScript** — typed, component-driven UI
- **Vite** — build tooling and dev server
- **Tailwind CSS** — design tokens and styling
- **Motion** — orchestrated entrance and cursor-reactive interactions
- **Vitest + Testing Library** — unit and section tests
- **GitHub Actions → GitHub Pages** — CI build and deploy on every push to `main`

## Local development

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
npm test         # run the test suite
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. Because the repository is named `vitaniko91-lang.github.io` (a GitHub user page), it serves from the root domain with default base `/`.

---

Designed & built by Vitalina Nikulina.
