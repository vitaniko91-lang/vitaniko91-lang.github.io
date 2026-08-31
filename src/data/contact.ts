/**
 * Closing-CTA contact details, shared by the Contact section and the Footer so
 * the email and social set stay in one place. The email is a placeholder until
 * Vitalina provides the real address; placeholder socials use `#` until their
 * real URLs are known.
 */

/** Primary contact address. */
export const EMAIL = 'vita.niko91@gmail.com'

/**
 * The CV landing page (`public/cv/index.html`), not the raw PDF. It carries its
 * own Open Graph tags, so a shared link renders a real preview card — LinkedIn
 * refuses to build one for a bare PDF URL and then won't accept the link at all.
 * The PDF itself sits at `/Vitalina-Nikulina-CV.pdf` and is the page's first
 * action. Rebuilt from `docs/portfolio/cv/build-cv.py`; re-copy the PDF into
 * `public/` whenever that changes, or the hub quietly serves a stale résumé.
 */
export const CV_HREF = '/cv/'

export interface SocialLink {
  /** Visible label + accessible-name root. */
  label: string
  /** Destination. `#` marks an unknown URL we haven't been given yet. */
  href: string
  /** Iconify name for the brand glyph (rendered in the current text color). */
  icon: string
}

export const socials: SocialLink[] = [
  { label: 'X', href: 'https://x.com/VitalinaN96916', icon: 'simple-icons:x' },
  { label: 'GitHub', href: 'https://github.com/vitaniko91-lang', icon: 'simple-icons:github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vitalina-nikulina-0a3088215/', icon: 'simple-icons:linkedin' },
  { label: 'Behance', href: 'https://www.behance.net/56wnbww4xp93e7', icon: 'simple-icons:behance' },
]

/** A real, off-site URL (gets a new tab + safe rel); `#` placeholders do not. */
export function isExternal(href: string): boolean {
  return href.startsWith('http')
}
