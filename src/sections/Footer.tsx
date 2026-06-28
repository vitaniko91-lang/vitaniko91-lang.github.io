import { Container } from '../components/Container'
import { Icon } from '../components/Icon'
import { SocialLinks } from '../components/SocialLinks'
import { cx } from '../lib/cx'

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const linkClass = cx(
  'rounded-sm font-sans text-sm text-muted',
  'transition-colors duration-200 hover:text-accent focus-visible:text-accent',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4',
)

/**
 * Footer — the quiet close. A hairline top rule, the wordmark + one-line pitch,
 * the same minimal nav and social set, the build credit, and a back-to-top
 * link. Chartreuse only on hover, keeping the single-accent discipline.
 */
export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Wordmark + one-liner. */}
          <div className="max-w-sm">
            <span className="inline-flex items-center gap-2.5">
              <span aria-hidden className="size-2.5 rounded-[2px] bg-accent" />
              <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-paper">
                Vitalina Nikulina
              </span>
            </span>
            <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
              Designer &amp; front-end engineer — idea to live.
            </p>
          </div>

          {/* The same minimal nav + social set. */}
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-x-16">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </a>
              ))}
            </nav>
            <SocialLinks orientation="vertical" />
          </div>
        </div>

        {/* Credit + back to top. */}
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-faint">
            Designed &amp; built by Vitalina Nikulina · 2026
          </p>
          <a
            href="#top"
            className={cx('group inline-flex items-center gap-1.5', linkClass, 'text-xs')}
          >
            Back to top
            <Icon
              name="lucide:arrow-up"
              className="size-3.5 text-faint transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:text-accent motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
            />
          </a>
        </div>
      </Container>
    </footer>
  )
}
