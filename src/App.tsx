import { Hero } from './sections/Hero'
import { Nav } from './sections/Nav'
import { Work } from './sections/Work'

/**
 * Portfolio hub shell. The Nav floats over the hero; the Hero is the confident
 * opening statement and holds the page's single <h1>. Selected Work is the
 * centerpiece — three cursor-reactive case cards and the `#work` target for the
 * hero's "See the work" CTA. About / Contact land in later tasks.
 */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
      </main>
    </>
  )
}
