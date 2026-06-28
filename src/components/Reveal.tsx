import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../lib/useReducedMotion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Optional stagger delay in seconds. */
  delay?: number
}

/**
 * Confident scroll reveal: fades + lifts content into place once it enters the
 * viewport. Weighty 600ms ease-out, transform/opacity only. Reduced-motion
 * users get the content instantly, with no movement.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}
