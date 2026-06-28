import type { ReactNode } from 'react'
import { cx } from '../lib/cx'
import { Icon } from './Icon'

type Variant = 'primary' | 'outline' | 'link'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  /** When set, renders an `<a>`; otherwise a `<button type="button">`. */
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  target?: string
  rel?: string
  className?: string
  'aria-label'?: string
}

// Custom ease-out curve (Emil) — stronger than the built-in keyword.
const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]'

const base = cx(
  'group inline-flex items-center justify-center gap-2 font-display font-medium',
  'transition-[transform,background-color,border-color,color,filter] duration-200',
  EASE,
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
  'active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100',
)

const variants: Record<Variant, string> = {
  primary: 'rounded-md bg-accent px-6 py-3 text-[15px] text-bg-base hover:brightness-110',
  outline:
    'rounded-md border border-line px-6 py-3 text-[15px] text-paper hover:border-accent hover:text-accent',
  link: 'text-[15px] text-paper',
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  target,
  rel,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const content =
    variant === 'link' ? (
      <>
        <span className="relative">
          {children}
          {/* Chartreuse underline that grows from the left on hover / keyboard focus. */}
          <span
            aria-hidden
            className={cx(
              'absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent',
              'transition-transform duration-300',
              EASE,
              'group-hover:scale-x-100 group-focus-visible:scale-x-100',
              'motion-reduce:transition-none motion-reduce:group-hover:scale-x-100',
            )}
          />
        </span>
        <Icon
          name="lucide:arrow-right"
          className={cx(
            'size-4 text-faint transition-[transform,color] duration-300',
            EASE,
            'group-hover:translate-x-0.5 group-hover:text-accent group-focus-visible:text-accent',
            'motion-reduce:transition-none motion-reduce:group-hover:translate-x-0',
          )}
        />
      </>
    ) : (
      children
    )

  const classes = cx(base, variants[variant], className)

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {content}
    </button>
  )
}
