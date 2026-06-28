import { CursorCard } from './components/CursorCard'
import { Section } from './components/Section'
import { cases } from './data/cases'
import { Hero } from './sections/Hero'
import { Nav } from './sections/Nav'

/**
 * Portfolio hub shell. The Nav floats over the hero; the Hero is the confident
 * opening statement and holds the page's single <h1>. The Selected Work grid
 * below is the placeholder centerpiece (its own task) and gives the hero's
 * "See the work" CTA a real #work target. About / Contact land in later tasks.
 */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

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
    </>
  )
}
