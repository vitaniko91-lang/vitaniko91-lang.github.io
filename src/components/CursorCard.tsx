import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode, RefObject } from 'react'
import { cx } from '../lib/cx'
import { useReducedMotion } from '../lib/useReducedMotion'

interface CursorCardProps {
  children: ReactNode
  className?: string
  /** Element to render. Defaults to `a` when `href` is given, else `div`. */
  as?: 'a' | 'div'
  href?: string
  target?: string
  rel?: string
  'aria-label'?: string
}

// Keep the tilt premium and restrained — a hint of depth, never a wobble.
const MAX_TILT = 5 // degrees
const PERSPECTIVE = 900 // px

/**
 * The hub's signature interaction. A work card that responds to the pointer:
 * a soft chartreuse spotlight tracks the cursor across the surface, and the
 * card tilts gently toward it with a small lift. The whole card is a real,
 * keyboard-focusable link — the tilt and spotlight are a pointer-only
 * enhancement.
 *
 * Accessibility:
 * - Renders an `<a>` so it is focusable and announced as a link.
 * - Visible chartreuse focus ring; keyboard focus also triggers the lift /
 *   spotlight via `:focus-within`.
 * - Reduced-motion or coarse-pointer (touch) devices skip the JS pointer
 *   tracking entirely — a static card with a CSS hover/focus border + lift.
 *
 * Performance: pointer updates are throttled to one rAF, write only transform
 * + CSS custom properties, and listeners are cleaned up on unmount.
 */
export function CursorCard({
  children,
  className,
  as,
  href,
  target,
  rel,
  'aria-label': ariaLabel,
}: CursorCardProps) {
  const reduced = useReducedMotion()
  const [interactive, setInteractive] = useState(false)
  const ref = useRef<HTMLElement | null>(null)
  const frame = useRef(0)
  const pending = useRef<{ x: number; y: number } | null>(null)

  // Tilt is only enabled for a fine pointer (mouse) when motion is allowed.
  useEffect(() => {
    if (reduced || typeof window === 'undefined' || !window.matchMedia) {
      setInteractive(false)
      return
    }
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setInteractive(mq.matches)
    const onChange = (event: MediaQueryListEvent) => setInteractive(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [reduced])

  useEffect(() => {
    const el = ref.current
    if (!el || !interactive) return

    const apply = () => {
      frame.current = 0
      const point = pending.current
      if (!point) return
      const rect = el.getBoundingClientRect()
      const px = (point.x - rect.left) / rect.width // 0..1 across the card
      const py = (point.y - rect.top) / rect.height
      const rotateY = (px - 0.5) * 2 * MAX_TILT // tilt toward the cursor
      const rotateX = -(py - 0.5) * 2 * MAX_TILT
      el.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`)
      el.style.setProperty('--my', `${(py * 100).toFixed(2)}%`)
      el.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale(1.015)`
    }

    const onMove = (event: PointerEvent) => {
      pending.current = { x: event.clientX, y: event.clientY }
      if (!frame.current) frame.current = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current)
        frame.current = 0
      }
      pending.current = null
      // Clearing inline transform lets the CSS transition ease it home.
      el.style.transform = ''
      el.style.removeProperty('--mx')
      el.style.removeProperty('--my')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [interactive])

  const classes = cx(
    'cursor-card group relative block overflow-hidden rounded-2xl border border-line bg-bg-raised',
    'transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
    'will-change-transform [transform-style:preserve-3d]',
    // Hover / keyboard-focus affordances. The CSS lift applies on keyboard
    // focus (no inline transform) and on static cards; the JS tilt overrides
    // it via the inline transform while a fine pointer is over the card.
    // The card is a non-focusable <div>; its real focus target is the stretched
    // Live link inside. When any link in the card is focused, focus-within lifts
    // the card and turns its whole border chartreuse — a clear, forced-colors-
    // safe card-level focus cue that complements each link's own accent ring.
    'hover:-translate-y-1 hover:border-line-bright',
    'focus-within:-translate-y-1 focus-within:border-accent',
    // When CursorCard is itself the link (`as`/`href` = 'a'), it carries its own
    // chartreuse focus ring; harmless on the non-focusable <div> variant.
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
    // Reduced motion: keep the border feedback, drop the animated movement.
    'motion-reduce:transition-[border-color]',
    className,
  )

  const spotlight = (
    <span
      aria-hidden
      className={cx(
        'pointer-events-none absolute inset-0 z-10 opacity-0',
        'transition-opacity duration-300 ease-out',
        'group-hover:opacity-100 group-focus-within:opacity-100',
      )}
      style={{
        background:
          'radial-gradient(240px circle at var(--mx) var(--my), rgba(198,242,78,0.10), rgba(244,245,247,0.04) 38%, transparent 66%)',
      }}
    />
  )

  const style = { '--mx': '50%', '--my': '50%' } as CSSProperties
  const Tag = as ?? (href ? 'a' : 'div')

  if (Tag === 'a') {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement | null>}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={classes}
        style={style}
      >
        {spotlight}
        {children}
      </a>
    )
  }

  return (
    <div
      ref={ref as RefObject<HTMLDivElement | null>}
      aria-label={ariaLabel}
      className={classes}
      style={style}
    >
      {spotlight}
      {children}
    </div>
  )
}
