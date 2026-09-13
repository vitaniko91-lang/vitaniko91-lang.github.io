import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Work } from './Work'
import { cases } from '../data/cases'

describe('Work — Selected Work centerpiece', () => {
  it('renders all three case names as headings', () => {
    render(<Work />)
    for (const item of cases) {
      expect(screen.getByRole('heading', { level: 3, name: item.name })).toBeInTheDocument()
    }
  })

  it('calls out the range explicitly', () => {
    render(<Work />)
    expect(
      screen.getByText(/Every project its own art direction — all designed, built, and shipped\./i),
    ).toBeInTheDocument()
  })

  it('gives every card a Live link to its live site (new tab, safe rel)', () => {
    render(<Work />)
    for (const item of cases) {
      const live = screen.getByRole('link', { name: `Live — ${item.name}` })
      expect(live).toHaveAttribute('href', item.live)
      expect(live).toHaveAttribute('target', '_blank')
      expect(live).toHaveAttribute('rel', expect.stringContaining('noopener'))
    }
  })

  it('gives every card with a repository a Code link to GitHub', () => {
    render(<Work />)
    for (const item of cases) {
      const code = screen.queryByRole('link', { name: `Code — ${item.name}` })
      if (!item.code) {
        expect(code).toBeNull()
        continue
      }
      expect(code).toHaveAttribute('href', item.code)
      expect(item.code).toMatch(/^https:\/\/github\.com\//)
      expect(code).toHaveAttribute('target', '_blank')
    }
  })

  it('gives every card with a public Figma file a Figma link (new tab, safe rel)', () => {
    render(<Work />)
    for (const item of cases) {
      const figma = screen.queryByRole('link', { name: `Figma — ${item.name}` })
      if (!item.figma) {
        expect(figma).toBeNull()
        continue
      }
      expect(figma).toHaveAttribute('href', item.figma)
      expect(item.figma).toMatch(/^https:\/\/www\.figma\.com\//)
      expect(figma).toHaveAttribute('target', '_blank')
      expect(figma).toHaveAttribute('rel', expect.stringContaining('noopener'))
    }
  })

  it('every card carries at least one artefact beside Live — code or Figma', () => {
    for (const item of cases) {
      expect(Boolean(item.code || item.figma)).toBe(true)
    }
  })

  it('opens an external case study in a new tab, an in-hub one in place', () => {
    render(<Work />)
    for (const item of cases) {
      if (!item.caseStudy) continue
      const link = screen.getByRole('link', { name: `Case study — ${item.name}` })
      expect(link).toHaveAttribute('href', item.caseStudy)
      if (/^https?:\/\//.test(item.caseStudy)) {
        expect(link).toHaveAttribute('target', '_blank')
      } else {
        expect(link).not.toHaveAttribute('target')
      }
    }
  })

  it('LAST is the pure-UX case: Live, external case study and Figma, no Code', () => {
    const last = cases.find((c) => c.id === 'last')
    expect(last).toBeDefined()
    expect(last!.code).toBeUndefined()
    expect(last!.figma).toMatch(/^https:\/\/www\.figma\.com\//)
    expect(last!.caseStudy).toBe('https://last-vitaniko91-langs-projects.vercel.app/case')
    expect(last!.tags).toEqual(['UX', 'Figma', 'E-commerce'])
  })

  it('renders each case thumbnail with the right source and alt text', () => {
    render(<Work />)
    for (const item of cases) {
      const img = screen.getByAltText(`${item.name} — site screenshot`)
      expect(img).toHaveAttribute('src', item.thumb)
    }
  })

  it('does not nest an anchor inside another anchor', () => {
    const { container } = render(<Work />)
    expect(container.querySelector('a a')).toBeNull()
  })
})
