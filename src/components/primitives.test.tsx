import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'
import { CursorCard } from './CursorCard'
import { Reveal } from './Reveal'
import { cases } from '../data/cases'

describe('Button', () => {
  it('renders a primary button with the accent fill', () => {
    render(<Button variant="primary">Start a project</Button>)
    const button = screen.getByRole('button', { name: 'Start a project' })
    expect(button).toHaveClass('bg-accent')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('renders an anchor when given an href', () => {
    render(
      <Button href="https://example.com" variant="primary">
        Visit
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Visit' })
    expect(link).toHaveAttribute('href', 'https://example.com')
  })
})

describe('Reveal', () => {
  it('renders its children', () => {
    render(<Reveal>Revealed content</Reveal>)
    expect(screen.getByText('Revealed content')).toBeInTheDocument()
  })
})

describe('CursorCard', () => {
  it('renders as a real link with its children and a focus ring', () => {
    render(
      <CursorCard href="https://example.com/work">
        <span>Case thumbnail</span>
      </CursorCard>,
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com/work')
    expect(link).toHaveTextContent('Case thumbnail')
    // Keyboard-focusable with a visible chartreuse focus ring.
    expect(link).toHaveClass('focus-visible:outline-accent')
  })
})

describe('cases data', () => {
  it('exports cases with valid live/code URLs and thumb paths', () => {
    expect(cases.length).toBeGreaterThanOrEqual(5)
    for (const item of cases) {
      expect(item.live).toMatch(/^https:\/\//)
      // Code is optional: a design-led case ships a Figma file instead.
      if (item.code) expect(item.code).toMatch(/^https:\/\/github\.com\//)
      if (item.figma) expect(item.figma).toMatch(/^https:\/\/www\.figma\.com\//)
      expect(item.code || item.figma).toBeTruthy()
      expect(item.thumb).toMatch(/^\/cases\/.+\.webp$/)
    }
  })

  it('has unique case ids', () => {
    const ids = cases.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
