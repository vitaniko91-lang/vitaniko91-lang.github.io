import { CursorCard } from '../components/CursorCard'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { cases } from '../data/cases'
import type { CaseItem } from '../data/cases'
import { cx } from '../lib/cx'

/**
 * Selected Work — the hub's centerpiece. Three shipped projects, each owning a
 * distinct art direction, shown as large cursor-reactive gallery cards. The
 * range is the pitch: one person, three worlds, all designed → built → shipped.
 *
 * Layout: a vertical stack of large split cards (big thumbnail beside the
 * text), the image side alternating left/right for editorial rhythm. On tablet
 * and mobile each card collapses to a single column (thumbnail on top). This
 * gives the wide 16:10 screenshots real estate and lets the cursor-reactive
 * signature read on a generous surface rather than a cramped 3-up.
 *
 * Nested-anchor a11y: the CursorCard renders a NON-link <div> (cursor effects
 * only). The whole card is made clickable via a single "Live" anchor using the
 * stretched-link pattern — its `::after` (transparent, z-1) covers the whole
 * card, anchored to the card root because every wrapper between the link and
 * the root is statically positioned. The "Code" anchor sits in normal flow with
 * `relative z-[2]`, so it stays an independent click + focus target above the
 * stretched overlay. Result: exactly one live link + one code link per card, no
 * `<a>` nested inside another `<a>`, every link keyboard-focusable with a
 * chartreuse ring, and the entire card opens the live site.
 */
export function Work() {
  return (
    <Section id="work">
      <Reveal>
        <p className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-faint">
          <span aria-hidden className="h-px w-7 bg-accent" />
          Selected work
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-[clamp(1.875rem,4.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-paper">
          Proof of range.
        </h2>
        <p className="mt-4 max-w-2xl font-sans text-lg leading-relaxed text-muted">
          Three projects, three art directions — all designed, built, and shipped.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col gap-8 md:mt-16 md:gap-10">
        {cases.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.08}>
            <WorkCard item={item} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function WorkCard({ item, index }: { item: CaseItem; index: number }) {
  // Alternate the image side on desktop for an editorial, gallery cadence.
  const flip = index % 2 === 1

  return (
    <CursorCard as="div" aria-label={item.name}>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch lg:min-h-[420px]">
        {/* Thumbnail — large, full-bleed within the card, with a hairline
            divider on the edge that meets the text column. */}
        <figure
          className={cx(
            'relative aspect-[16/10] overflow-hidden bg-bg-sunk lg:aspect-auto lg:h-full',
            'border-b border-line lg:border-b-0',
            flip ? 'lg:order-2 lg:border-l' : 'lg:order-1 lg:border-r',
          )}
        >
          <img
            src={item.thumb}
            alt={`${item.name} — site screenshot`}
            width={1200}
            height={750}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={cx(
              'h-full w-full object-cover object-top',
              'transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
              'group-hover:scale-[1.03] group-focus-within:scale-[1.03]',
              'motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100',
            )}
          />
        </figure>

        {/* Text column. Every wrapper here is statically positioned so the
            stretched-link `::after` anchors to the card root, not this column. */}
        <div
          className={cx(
            'flex flex-col justify-center p-7 md:p-10',
            flip ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">
              {item.kicker}
            </span>
            <span className="rounded-full border border-accent/30 px-3 py-1 font-sans text-[11px] font-medium tracking-tight text-accent-dim">
              {item.artDirection}
            </span>
          </div>

          <h3 className="mt-5 font-display text-[clamp(1.5rem,2.6vw,1.875rem)] font-semibold leading-tight tracking-[-0.01em] text-paper">
            {item.name}
          </h3>

          <p className="mt-3 max-w-[46ch] font-sans text-[15px] leading-relaxed text-muted md:text-base">
            {item.blurb}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-line px-2.5 py-1 font-sans text-xs text-faint"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
            <ActionLink href={item.live} label="Live" srName={item.name} stretched />
            {item.caseStudy ? (
              <ActionLink href={item.caseStudy} label="Case study" srName={item.name} internal />
            ) : null}
            <ActionLink href={item.code} label="Code" srName={item.name} />
          </div>
        </div>
      </div>
    </CursorCard>
  )
}

interface ActionLinkProps {
  href: string
  /** Visible label, kept first in the accessible name for WCAG 2.5.3. */
  label: string
  /** Project name, appended for unambiguous link names across cards. */
  srName: string
  /** Stretched primary link: its `::after` makes the whole card clickable. */
  stretched?: boolean
  /** Internal route → no new tab. */
  internal?: boolean
}

function ActionLink({ href, label, srName, stretched, internal }: ActionLinkProps) {
  return (
    <a
      href={href}
      target={internal ? undefined : '_blank'}
      rel={internal ? undefined : 'noopener noreferrer'}
      aria-label={`${label} — ${srName}`}
      className={cx(
        'group/link inline-flex items-center gap-1.5 rounded-sm font-sans text-sm font-medium text-paper',
        'transition-colors duration-200 ease-out hover:text-accent',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4',
        // Stretched primary link covers the whole card (anchored to the card
        // root); the others sit above it so they stay independently clickable.
        stretched
          ? "after:absolute after:inset-0 after:z-[1] after:rounded-2xl after:content-['']"
          : 'relative z-[2]',
      )}
    >
      {label}
      <Icon
        name="lucide:arrow-up-right"
        className={cx(
          'size-4 text-faint transition-[transform,color] duration-200 ease-out',
          'group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-accent',
          'motion-reduce:transition-none motion-reduce:group-hover/link:translate-x-0 motion-reduce:group-hover/link:translate-y-0',
        )}
      />
    </a>
  )
}
