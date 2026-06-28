import type { ReactNode } from 'react'
import { cx } from '../lib/cx'
import { Container } from './Container'

interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
}

/**
 * Semantic page section with the gallery's generous vertical rhythm.
 * Background stays transparent so the page background shows through; content
 * is wrapped in a Container for consistent measure and gutters.
 */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cx('py-24 md:py-32', className)}>
      <Container>{children}</Container>
    </section>
  )
}
