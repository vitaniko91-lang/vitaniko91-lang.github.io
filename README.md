# Vitalina Nikulina — Portfolio Hub

The home base for Vitalina Nikulina — designer & front-end engineer who designs in Figma, builds in React + TypeScript + Tailwind, and ships the live site. One person, idea to live, no handoff.

**Live:** https://vitaniko91-lang.github.io/

A single-page hub with a confident opening statement and a Selected Work gallery of three shipped projects — each one its own distinct art direction, because the range is the point.

## Selected work

| Project | What it is | Live | Code |
|---|---|---|---|
| **Ollama — Concept Redesign** | Ollama's landing page rebuilt as one living terminal session — every section reads like a command and its output. *(Living Terminal — dark · mono)* | [Live](https://vitaniko91-lang.github.io/ollama-redesign/) | [Code](https://github.com/vitaniko91-lang/ollama-redesign) |
| **Helm — 0→1 Brand & Site** | A fictional boutique AI-agent studio invented end-to-end: brand, voice, and an editorial site that carries itself like a print spread. *(Editorial Atelier — light · serif)* | [Live](https://vitaniko91-lang.github.io/helm/) | [Code](https://github.com/vitaniko91-lang/helm) |
| **Hero Lab — AI Tool** | A real, shipped AI tool: describe a product, get a polished hero section plus the production React + Tailwind code behind it. *(Playful Maker — colorful · product)* | [Live](https://hero-generator.vercel.app) | [Code](https://github.com/vitaniko91-lang/hero-generator) |

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
