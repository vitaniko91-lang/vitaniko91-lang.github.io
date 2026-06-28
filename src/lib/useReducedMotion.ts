import { useEffect, useState } from 'react'

/**
 * Tracks the user's `prefers-reduced-motion` setting.
 * Returns `true` when the user has asked the OS to reduce motion, so callers
 * can fall back to instant, movement-free states. Updates live if the setting
 * changes. SSR / test-safe: defaults to `false` when matchMedia is missing.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
