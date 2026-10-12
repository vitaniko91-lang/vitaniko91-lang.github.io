/**
 * PostHog, cookieless. `persistence: 'memory'` writes nothing to cookies or
 * storage, so no consent banner is needed; the price is that a returning
 * visitor counts as new. EU host keeps the data in the EU.
 *
 * The library is imported dynamically so it lands in its own chunk and never
 * delays first paint. Without a key, or outside a production build, nothing
 * is downloaded at all.
 */
interface Options {
  key: string | undefined
  enabled: boolean
}

export async function startAnalytics({ key, enabled }: Options): Promise<boolean> {
  if (!key || !enabled) return false
  const { default: posthog } = await import('posthog-js')
  posthog.init(key, {
    api_host: 'https://eu.i.posthog.com',
    persistence: 'memory',
    person_profiles: 'identified_only',
    respect_dnt: true,
    capture_pageview: true,
    capture_pageleave: true,
    session_recording: { maskAllInputs: true },
    disable_surveys: true,
  })
  return true
}
