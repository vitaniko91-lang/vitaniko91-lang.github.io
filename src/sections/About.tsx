import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'

/**
 * About — the "designer who ships" story. A confident Schibsted statement makes
 * the pitch (design AND build, one person), two tight first-person paragraphs
 * explain why that's rare and what the client gets, and an editorial two-column
 * capabilities block lists the toolset with chartreuse ticks. A slim "How I
 * work" flow closes it: idea → design → build → ship, one continuous hand.
 *
 * Left-aligned to match the page's editorial rhythm; the lone accent moments
 * are the chartreuse phrase in the statement and the capability ticks.
 */

interface Capability {
  /** Column heading. */
  title: string
  /** Skills listed under it, shown each with a chartreuse tick. */
  items: string[]
}

const capabilities: Capability[] = [
  {
    title: 'Design',
    items: ['Figma', 'UI/UX', 'Design systems', 'Art direction', 'Motion'],
  },
  {
    title: 'Build',
    items: [
      'React',
      'TypeScript',
      'Tailwind',
      'framer-motion',
      'Serverless',
      'Accessibility (WCAG)',
      'Vercel / GitHub Pages',
    ],
  },
]

const steps = ['Idea', 'Design', 'Build', 'Ship'] as const

export function About() {
  return (
    <Section id="about">
      <Reveal>
        <p className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-faint">
          <span aria-hidden className="h-px w-7 bg-accent" />
          About
        </p>
      </Reveal>

      {/* Statement + paragraphs: an asymmetric editorial split on desktop. */}
      <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 lg:mt-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="max-w-[15ch] font-display text-[clamp(1.875rem,4.4vw,3rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-paper">
            A designer who writes the <span className="text-accent">production code</span>, too.
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-5 lg:col-span-5 lg:pt-2">
          <p className="font-sans text-base leading-relaxed text-muted md:text-[17px]">
            Most projects run a relay: a designer hands off a static mockup, a developer rebuilds
            it, and the details get lost in the pass. I close that gap — I design it in Figma, build
            it in React and Tailwind, and ship it live myself.
          </p>
          <p className="font-sans text-base leading-relaxed text-muted md:text-[17px]">
            So you get one person across the whole arc — visual direction, interaction,
            accessibility, performance, deploy. No handoff, no telephone game. The site ships
            exactly as designed.
          </p>
        </Reveal>
      </div>

      {/* Capabilities — two editorial columns, hairline-ruled, chartreuse ticks. */}
      <Reveal delay={0.05}>
        <div className="mt-14 border-t border-line pt-10 md:mt-16">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-faint">
            Capabilities
          </p>
          <div className="mt-7 grid grid-cols-1 gap-x-12 gap-y-9 sm:grid-cols-2">
            {capabilities.map((group) => (
              <div key={group.title}>
                <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-paper">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 font-sans text-[15px] text-muted"
                    >
                      <Icon name="lucide:check" className="size-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* How I work — one continuous hand, idea to ship. A real sequence, so the
          steps are an ordered list connected by chartreuse arrows. */}
      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-faint">
            How I work
          </p>
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-base font-medium text-paper md:text-lg">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center gap-3">
                {step}
                {index < steps.length - 1 ? (
                  <Icon name="lucide:arrow-right" className="size-4 text-accent" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </Section>
  )
}
