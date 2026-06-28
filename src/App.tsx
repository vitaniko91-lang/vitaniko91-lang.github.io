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
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
