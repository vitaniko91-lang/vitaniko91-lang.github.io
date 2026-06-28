import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Icon } from '../components/Icon'
import { useReducedMotion } from '../lib/useReducedMotion'

const EASE = [0.23, 1, 0.32, 1] as const

// One orchestrated page-load moment: eyebrow → headline lines → sub → CTAs
// lift into place with a weighty, staggered ease-out. No clip masks, so the
// headline stays safe to wrap at any width.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

/**
 * The hub's confident opening statement: who she is, the rare combo, and the
 * two ways in (see the work / start a project). A faint chartreuse glow tracks
 * the cursor across the dark canvas as the gallery's ambient signature; on
 * touch / reduced-motion it settles into a static glow and the entrance plays
 * instantly.
 */
export function Hero() {
  const reduced = useReducedMotion()
  const glowRef = useRef<HTMLDivElement | null>(null)
  const frame = useRef(0)
  const pending = useRef<{ x: number; y: number } | null>(null)

  // Cursor-following ambient glow — fine pointer + motion-allowed only.
  // Writes a single CSS variable per rAF; nothing reads layout in the loop.
  useEffect(() => {
    const el = glowRef.current
    if (!el || reduced || typeof window === 'undefined' || !window.matchMedia) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const apply = () => {
      frame.current = 0
      const point = pending.current
      if (!point) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--gx', `${(((point.x - rect.left) / rect.width) * 100).toFixed(2)}%`)
      el.style.setProperty('--gy', `${(((point.y - rect.top) / rect.height) * 100).toFixed(2)}%`)
    }
    const onMove = (event: PointerEvent) => {
      pending.current = { x: event.clientX, y: event.clientY }
      if (!frame.current) frame.current = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [reduced])

  const glowStyle = {
    '--gx': '38%',
    '--gy': '32%',
    background:
      'radial-gradient(560px circle at var(--gx) var(--gy), rgba(198,242,78,0.10), rgba(198,242,78,0.03) 40%, transparent 68%)',
  } as CSSProperties

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Ambient chartreuse glow + a faint cool radial floor for depth. */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={glowStyle}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-bg-sunk to-transparent"
      />

      <Container className="py-28 md:py-32">
        <motion.div
          className="max-w-4xl"
          variants={container}
          initial={reduced ? 'show' : 'hidden'}
          animate="show"
        >
          {/* Eyebrow with a short chartreuse rule. */}
          <motion.p
            variants={item}
            className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-faint"
          >
            <span aria-hidden className="h-px w-7 bg-accent" />
            Designer &amp; Front-End Engineer
          </motion.p>

          {/* The statement. One chartreuse accent word ("ship"); the qualifier
              is a quieter, smaller muted line for editorial hierarchy. */}
          <h1 className="mt-7 font-display font-bold tracking-[-0.03em] text-paper">
            <motion.span
              variants={item}
              className="block text-[clamp(2.125rem,6.2vw,4.75rem)] leading-[0.98]"
            >
              I design and <span className="text-accent">ship</span>
            </motion.span>
            <motion.span
              variants={item}
              className="block text-[clamp(2.125rem,6.2vw,4.75rem)] leading-[0.98]"
            >
              production-ready websites.
            </motion.span>
            <motion.span
              variants={item}
              className="mt-3 block text-[clamp(1.375rem,3vw,2.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-muted"
            >
              One person — from idea to live.
            </motion.span>
          </h1>

          {/* The rare combo, plainly stated. */}
          <motion.p
            variants={item}
            className="mt-7 max-w-[560px] font-sans text-base leading-relaxed text-muted md:text-lg"
          >
            The rare combo: I design in Figma, then build it in React, TypeScript &amp; Tailwind
            and deploy — no handoff, no telephone game. From concept to a live, fast, accessible
            site, end to end.
          </motion.p>

          {/* Two ways in. */}
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href="#work" variant="primary">
              See the work
              <Icon
                name="lucide:arrow-down"
                className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
              />
            </Button>
            <Button href="#contact" variant="link">
              Start a project
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
