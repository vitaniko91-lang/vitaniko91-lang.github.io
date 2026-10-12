import { beforeEach, describe, expect, it, vi } from 'vitest'

const init = vi.fn()
vi.mock('posthog-js', () => ({ default: { init } }))

import { startAnalytics } from './analytics'

describe('startAnalytics', () => {
  beforeEach(() => init.mockClear())

  it('does nothing without a project key', async () => {
    expect(await startAnalytics({ key: undefined, enabled: true })).toBe(false)
    expect(await startAnalytics({ key: '', enabled: true })).toBe(false)
    expect(init).not.toHaveBeenCalled()
  })

  it('does nothing outside production builds', async () => {
    expect(await startAnalytics({ key: 'phc_test', enabled: false })).toBe(false)
    expect(init).not.toHaveBeenCalled()
  })

  it('initialises PostHog cookieless on the EU host', async () => {
    expect(await startAnalytics({ key: 'phc_test', enabled: true })).toBe(true)
    expect(init).toHaveBeenCalledTimes(1)
    const [key, config] = init.mock.calls[0]
    expect(key).toBe('phc_test')
    expect(config).toMatchObject({
      api_host: 'https://eu.i.posthog.com',
      persistence: 'memory',
      respect_dnt: true,
      capture_pageview: true,
      capture_pageleave: true,
      session_recording: { maskAllInputs: true },
      disable_surveys: true,
    })
  })
})
