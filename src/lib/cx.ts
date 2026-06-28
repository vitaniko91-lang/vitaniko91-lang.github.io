/**
 * Tiny className joiner. Filters out falsy values and joins with a space.
 * Keeps component markup readable without pulling in a dependency.
 */
export function cx(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ')
}
