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
      screen.getByText(/Three projects, three art directions — all designed, built, and shipped\./i),
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

  it('gives every card a Code link to its GitHub repository', () => {
    render(<Work />)
    for (const item of cases) {
      const code = screen.getByRole('link', { name: `Code — ${item.name}` })
      expect(code).toHaveAttribute('href', item.code)
      expect(item.code).toMatch(/^https:\/\/github\.com\//)
      expect(code).toHaveAttribute('target', '_blank')
    }
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
