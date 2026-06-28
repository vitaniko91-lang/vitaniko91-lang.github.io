import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { About } from './About'

describe('About — designer who ships', () => {
  it('renders the confident statement as a section heading', () => {
    render(<About />)
    expect(
      screen.getByRole('heading', { level: 2, name: /designer who writes the production code/i }),
    ).toBeInTheDocument()
  })

  it('lists the Design and Build capability columns', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 3, name: 'Design' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Build' })).toBeInTheDocument()
  })

  it('renders the toolset items', () => {
    render(<About />)
    for (const item of [
      'Figma',
      'UI/UX',
      'Design systems',
      'Art direction',
      'Motion',
      'React',
      'TypeScript',
      'Tailwind',
      'framer-motion',
      'Serverless',
      'Accessibility (WCAG)',
      'Vercel / GitHub Pages',
    ]) {
      expect(screen.getByText(item)).toBeInTheDocument()
    }
  })

  it('shows the idea → design → build → ship flow', () => {
    render(<About />)
    for (const step of ['Idea', 'Design', 'Build', 'Ship']) {
      expect(screen.getAllByText(step).length).toBeGreaterThan(0)
    }
  })
})
