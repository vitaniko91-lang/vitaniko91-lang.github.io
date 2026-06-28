import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Icon } from '../components/Icon'
import { cx } from '../lib/cx'
import { useReducedMotion } from '../lib/useReducedMotion'

const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]'

interface LinkDef {
  href: string
  label: string
}

const LINKS: LinkDef[] = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

/** A nav link with a chartreuse underline that grows from the left, plus a
 *  clearly visible focus-visible accent ring for keyboard users. */
function NavLink({ href, label, onClick }: LinkDef & { onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cx(
        'group relative rounded-sm font-sans text-sm text-muted',
        'transition-colors duration-200 hover:text-paper focus-visible:text-paper',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4',
      )}
    >
      <span className="relative">
        {label}
        <span
          aria-hidden
          className={cx(
            'absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent',
            'transition-transform duration-300',
            EASE,
            'group-hover:scale-x-100 group-focus-visible:scale-x-100',
            'motion-reduce:transition-none',
          )}
        />
      </span>
    </a>
  )
}

/**
 * Sticky gallery nav. Transparent over the hero, then on scroll past ~8px it
 * gains a translucent near-black backdrop + a hairline bottom rule (passive
 * scroll listener, class toggle). Desktop shows the wordmark, three anchor
 * links and a restrained "Start a project" CTA; below md it collapses to the
 * wordmark + an accessible hamburger menu (aria-expanded/controls, Esc closes).
 */
export function Nav() {
  const reduced = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Passive scroll listener — only flips a boolean, never reads layout.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Esc closes the mobile menu.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 border-b',
        'transition-[background-color,border-color,backdrop-filter] duration-300',
        EASE,
        solid
          ? 'border-line bg-bg-base/80 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        {/* Wordmark with a small chartreuse logo mark. */}
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className={cx(
            'group inline-flex items-center gap-2.5 rounded-sm',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4',
          )}
        >
          <span
            aria-hidden
            className={cx(
              'size-2.5 rounded-[2px] bg-accent',
              'transition-transform duration-300',
              EASE,
              'group-hover:rotate-45 motion-reduce:transition-none motion-reduce:group-hover:rotate-0',
            )}
          />
          <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-paper">
            Vitalina Nikulina
          </span>
        </a>

        {/* Desktop links + CTA. */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <Button href="#contact" variant="outline" className="px-5 py-2.5 text-sm">
            Start a project
          </Button>
        </nav>

        {/* Mobile menu trigger. */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className={cx(
            'inline-flex size-10 items-center justify-center rounded-md text-paper md:hidden',
            'transition-colors duration-200 hover:text-accent active:scale-95',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
            'motion-reduce:active:scale-100',
          )}
        >
          <Icon name={open ? 'lucide:x' : 'lucide:menu'} className="size-6" />
        </button>
      </Container>

      {/* Mobile dropdown panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="border-t border-line bg-bg-base/95 backdrop-blur-md md:hidden"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <Container className="flex flex-col gap-1 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cx(
                    'rounded-md px-2 py-3 font-display text-lg font-medium text-paper',
                    'transition-colors duration-200 hover:text-accent',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
                  )}
                >
                  {link.label}
                </a>
              ))}
              <Button
                href="#contact"
                variant="primary"
                className="mt-3 w-full"
                onClick={() => setOpen(false)}
              >
                Start a project →
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
