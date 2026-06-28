/**
 * Closing-CTA contact details, shared by the Contact section and the Footer so
 * the email and social set stay in one place. The email is a placeholder until
 * Vitalina provides the real address; placeholder socials use `#` until their
 * real URLs are known.
 */

/** Primary contact address. Placeholder — swap for the real inbox. */
export const EMAIL = 'hello@vitalinanikulina.com'

export interface SocialLink {
  /** Visible label + accessible-name root. */
  label: string
  /** Destination. `#` marks an unknown URL we haven't been given yet. */
  href: string
  /** Iconify name for the brand glyph (rendered in the current text color). */
  icon: string
}

export const socials: SocialLink[] = [
  { label: 'X', href: '#', icon: 'simple-icons:x' },
  { label: 'GitHub', href: 'https://github.com/vitaniko91-lang', icon: 'simple-icons:github' },
  { label: 'LinkedIn', href: '#', icon: 'simple-icons:linkedin' },
  { label: 'Behance', href: '#', icon: 'simple-icons:behance' },
]

/** A real, off-site URL (gets a new tab + safe rel); `#` placeholders do not. */
export function isExternal(href: string): boolean {
  return href.startsWith('http')
}
