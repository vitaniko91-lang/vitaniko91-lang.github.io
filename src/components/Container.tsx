import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

interface ContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Centered content column. Caps width at the gallery's 1200px measure and
 * supplies the responsive horizontal gutter every section shares.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cx('mx-auto w-full max-w-content px-6 md:px-10 lg:px-16', className)}>
      {children}
    </div>
  )
}
