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
 * Selected work — shipped projects, each with a distinct art direction.
 * The range is the point: every case owns its own visual world.
 */
export const cases: CaseItem[] = [
  {
    id: 'timbre',
    name: 'TIMBRE — See the Sound',
    kicker: 'Award showpiece',
    blurb:
      'A fictional premium-audio brand whose hero is a single drop of liquid glass — play a track and it ripples, refracts and re-colors in real time to the sound itself, frequency by frequency.',
    artDirection: 'Pearl Prism — pearl-white · spectral glass',
    tags: ['three.js', 'WebGL', 'Web Audio'],
    thumb: '/cases/timbre.webp',
    live: 'https://timbre-ruby.vercel.app',
    code: 'https://github.com/vitaniko91-lang/timbre',
  },
  {
    id: 'meridian',
    name: 'MERIDIAN — Payment, Slowed 4,000×',
    kicker: 'Award showpiece',
    blurb:
      'The life of a single B2B payment, slowed 4,000× and told as one GPU particle river across seven chapters — here, scroll drives time, not space.',
    artDirection: 'Vault Light — black · champagne gold',
    tags: ['three.js', 'WebGL', 'Motion'],
    thumb: '/cases/meridian.webp',
    live: 'https://meridian-settlement.vercel.app',
    code: 'https://github.com/vitaniko91-lang/meridian',
  },
  {
    id: 'fairfare',
    name: 'FAIRFARE — An Honest Booking Flow',
    kicker: 'Unsolicited redesign',
    blurb:
      "Ryanair's checkout is a masterclass in dark patterns. I audited the live flow, named every pattern, and rebuilt it without them — keeping each place the airline actually makes money.",
    artDirection: 'Redesign, not rebrand — navy · scarce yellow',
    tags: ['React', 'TypeScript', 'UX audit'],
    thumb: '/cases/fairfare.webp',
    live: 'https://fairfare.vercel.app',
    code: 'https://github.com/vitaniko91-lang/fairfare',
  },
  {
    id: 'relay',
    name: 'Relay — AI-Agent Dashboard',
    kicker: 'Product UI',
    blurb:
      'A live observability dashboard for teams running AI agents in production — every run, cost, and failure in one place, down to the step-by-step trace.',
    artDirection: 'Dark Ops-Tool — slate · cyan',
    tags: ['React', 'TypeScript', 'Data viz'],
    thumb: '/cases/relay.webp',
    live: 'https://relay-obs.vercel.app',
    code: 'https://github.com/vitaniko91-lang/relay',
  },
  {
    id: 'stillpoint',
    name: 'Stillpoint — Breathwork App',
    kicker: 'Wellness product',
    blurb:
      'A calm breathwork guide you use right in the browser — a live breathing orb, coherence / box / 4-7-8 patterns, and a focused timed session.',
    artDirection: 'Warm Calm — paper · serif',
    tags: ['React', 'Motion', 'Web Audio'],
    thumb: '/cases/stillpoint.webp',
    live: 'https://stillpoint-app.vercel.app',
    code: 'https://github.com/vitaniko91-lang/stillpoint',
  },
  {
    id: 'ollama',
    name: 'Ollama — Concept Redesign',
    kicker: 'Concept redesign',
    blurb:
      "A concept redesign of Ollama's landing page, rebuilt as one living terminal session — every section reads like a command and its output.",
    artDirection: 'Living Terminal — dark · mono',
    tags: ['React', 'Tailwind', 'Motion'],
    thumb: '/cases/ollama.webp',
    live: 'https://ollama-redesign.vercel.app',
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
    live: 'https://helm-ai-studio.vercel.app',
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
