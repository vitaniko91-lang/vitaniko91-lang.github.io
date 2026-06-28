export interface CaseItem {
  /** Stable slug, used for keys and anchors. */
  id: string
  /** Project name as shown on the card. */
  name: string
  /** Short framing label, e.g. "Concept redesign". */
  kicker: string
  /** One- to two-sentence description for the card. */
  blurb: string
  /** The project's own art direction, in a few words. */
  artDirection: string
  tags: string[]
  /** Path to the optimized thumbnail in /public. */
  thumb: string
  /** Live, deployed site. */
  live: string
  /** Source code repository. */
  code: string
  /** Optional in-hub case study route. */
  caseStudy?: string
}

/**
 * Selected work — three shipped projects, three distinct art directions.
 * The range is the point: each case owns its own visual world.
 */
export const cases: CaseItem[] = [
  {
    id: 'ollama',
    name: 'Ollama — Concept Redesign',
    kicker: 'Concept redesign',
    blurb:
      "A concept redesign of Ollama's landing page, rebuilt as one living terminal session — every section reads like a command and its output.",
    artDirection: 'Living Terminal — dark · mono',
    tags: ['React', 'Tailwind', 'Motion'],
    thumb: '/cases/ollama.webp',
    live: 'https://vitaniko91-lang.github.io/ollama-redesign/',
    code: 'https://github.com/vitaniko91-lang/ollama-redesign',
  },
  {
    id: 'helm',
    name: 'Helm — 0→1 Brand & Site',
    kicker: '0→1 brand',
    blurb:
      'A fictional boutique AI-agent studio, invented end-to-end: brand, voice, and an editorial site that carries itself like a print spread.',
    artDirection: 'Editorial Atelier — light · serif',
    tags: ['Branding', 'React', 'Motion'],
    thumb: '/cases/helm.webp',
    live: 'https://vitaniko91-lang.github.io/helm/',
    code: 'https://github.com/vitaniko91-lang/helm',
  },
  {
    id: 'herolab',
    name: 'Hero Lab — AI Tool',
    kicker: 'Real product',
    blurb:
      'A real, shipped AI tool: describe a product and get a polished hero section plus the production React and Tailwind code behind it.',
    artDirection: 'Playful Maker — colorful · product',
    tags: ['React', 'Serverless', 'Claude'],
    thumb: '/cases/herolab.webp',
    live: 'https://hero-generator.vercel.app',
    code: 'https://github.com/vitaniko91-lang/hero-generator',
  },
]
