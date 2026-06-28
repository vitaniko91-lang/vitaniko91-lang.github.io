// After-QA full-page screenshots for the portfolio hub ("Confident Gallery").
//
// Self-contained: drives system Chrome via playwright-core (channel: 'chrome'),
// an isolated/ephemeral profile, reduced motion, and DPR 2. Captures the full
// scrollable page at three breakpoints into docs/portfolio/hub/after/.
//
// Prereq: a static server for the production build must be running. By default
// it targets the `vite preview` URL below — start it with:
//   npm run build && npm run preview -- --port 4317 --strictPort
//
// Run (from the project root so playwright-core resolves):
//   node scripts/after-screenshots.mjs
//
// Override the target URL / output dir with env vars:
//   URL=http://localhost:4317/ OUT=/abs/out/dir node scripts/after-screenshots.mjs
import { chromium } from 'playwright-core'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const URL = process.env.URL ?? 'http://localhost:4317/'
const OUT =
  process.env.OUT ?? resolve(__dirname, '../../../docs/portfolio/hub/after')

const BREAKPOINTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
]

// Scroll the whole page in viewport steps so below-the-fold lazy images fetch,
// then wait until every <img> has finished decoding before we snapshot.
async function settlePage(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map((img) =>
        img.complete ? Promise.resolve() : img.decode().catch(() => {}),
      ),
    ),
  )
  await page.waitForTimeout(400)
}

async function main() {
  await mkdir(OUT, { recursive: true })
  // channel:'chrome' uses the installed Google Chrome; no bundled browser needed.
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  try {
    for (const bp of BREAKPOINTS) {
      // A fresh context per breakpoint = isolated profile, DPR 2, reduced motion.
      const context = await browser.newContext({
        viewport: { width: bp.width, height: bp.height },
        deviceScaleFactor: 2,
        reducedMotion: 'reduce',
      })
      const page = await context.newPage()
      await page.goto(URL, { waitUntil: 'networkidle' })
      await settlePage(page)
      const file = resolve(OUT, `${bp.name}.png`)
      await page.screenshot({ path: file, fullPage: true })
      console.log(`captured ${bp.name} (${bp.width}w) -> ${file}`)
      await context.close()
    }
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
