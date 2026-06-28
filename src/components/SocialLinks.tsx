import { cx } from '../lib/cx'
import { isExternal, socials } from '../data/contact'
import { Icon } from './Icon'

interface SocialLinksProps {
  /** Render the brand glyph before each label (used in the larger Contact row). */
  withIcons?: boolean
  /** Stack vertically (footer) or lay out as a wrapped row (default). */
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

/**
 * The shared social row, used by both Contact and the Footer. Real off-site
 * links open in a new tab with a safe `rel` and announce that they do so;
 * `#` placeholders stay in-tab until their real URLs are supplied. Chartreuse
 * hover + a visible chartreuse focus ring keep the single-accent discipline.
 */
export function SocialLinks({
  withIcons = false,
  orientation = 'horizontal',
  className,
}: SocialLinksProps) {
  return (
    <ul
      className={cx(
        'flex flex-wrap gap-x-7 gap-y-3',
        orientation === 'vertical' ? 'flex-col items-start' : 'items-center',
        className,
      )}
    >
      {socials.map((social) => {
        const external = isExternal(social.href)
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={external ? `${social.label} (opens in a new tab)` : social.label}
              className={cx(
                'group inline-flex items-center gap-2 rounded-sm font-sans text-sm text-muted',
                'transition-colors duration-200 hover:text-accent focus-visible:text-accent',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4',
              )}
            >
              {withIcons ? <Icon name={social.icon} className="size-4 shrink-0" /> : null}
              {social.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
