import { Button } from './components/Button'
import { CursorCard } from './components/CursorCard'
import { Section } from './components/Section'
import { cases } from './data/cases'

/**
 * Temporary primitives preview — exercised for the build screenshot.
 * The real hub composition (Nav, Hero, Selected Work, About, Contact) lands in
 * the following tasks; this keeps a single h1 + pitch so the page reads as the
 * portfolio while showcasing the Button row and the signature CursorCard.
 */
export default function App() {
  return (
    <main>
      <Section className="pb-12 pt-28 md:pb-16 md:pt-36">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-faint">
          Designer &amp; Front-End Engineer
        </p>
        <h1 className="mt-6 max-w-[14ch] font-display text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-paper sm:text-7xl">
          Vitalina Nikulina<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-xl font-sans text-lg text-muted">
          I design and ship production-ready websites — one person, idea to live.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#contact" variant="primary">
            Start a project →
          </Button>
          <Button href="#work" variant="outline">
            See the work ↓
          </Button>
          <Button href={cases[0].live} variant="link" target="_blank" rel="noreferrer">
            Read a case study
          </Button>
        </div>
      </Section>

      <Section id="work" className="pt-0">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-faint">
          Selected work
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-[-0.02em] text-paper sm:text-4xl">
          Three projects, three art directions, all shipped.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cases.map((item) => (
            <CursorCard
              key={item.id}
              href={item.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`${item.name} — open live site`}
            >
              <div className="aspect-[16/10] overflow-hidden border-b border-line">
                <img
                  src={item.thumb}
                  alt={`${item.name} screenshot`}
                  width={1200}
                  height={750}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="relative z-20 p-6">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-accent-dim">
                  {item.kicker}
                </p>
                <h3 className="mt-2 font-display text-[22px] font-semibold leading-tight tracking-[-0.01em] text-paper">
                  {item.name}
                </h3>
                <p className="mt-2 font-sans text-sm text-muted">{item.artDirection}</p>
              </div>
            </CursorCard>
          ))}
        </div>
      </Section>
    </main>
  )
}
