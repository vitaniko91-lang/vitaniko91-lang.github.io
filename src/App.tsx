import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Nav } from './sections/Nav'
import { Work } from './sections/Work'

/**
 * Portfolio hub shell. The Nav floats over the hero; the Hero is the confident
 * opening statement and holds the page's single <h1>. Selected Work is the
 * centerpiece; About tells the "designer who ships" story and Contact is the
 * closing CTA. The Footer sits outside <main> as the page's quiet close.
 */
export default function App() {
  return (
    <>
      {/* Skip link: first focusable element, hidden until keyboard focus, then a
          chartreuse chip top-left. Moves focus past the nav to the main content. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2.5 focus:font-display focus:text-sm focus:font-semibold focus:text-bg-base focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-paper focus:ring-offset-2 focus:ring-offset-bg-base"
      >
        Skip to content
      </a>
      <Nav />
      {/* tabIndex=-1 so the skip link actually moves focus here; the visible
          affordance is the skip chip + content scrolling into view. */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
