import { Icon as Iconify } from '@iconify/react'

interface IconProps {
  /** Iconify icon name, e.g. `lucide:arrow-right`. */
  name: string
  className?: string
}

/**
 * Thin Iconify wrapper. Icons are decorative here — always `aria-hidden`.
 * When an icon needs a label, give the surrounding control an accessible name.
 */
export function Icon({ name, className }: IconProps) {
  return <Iconify icon={name} className={className} aria-hidden />
}
