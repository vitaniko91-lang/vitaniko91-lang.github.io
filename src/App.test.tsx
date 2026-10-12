import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { cases } from './data/cases'

describe('App', () => {
  it('renders the confident hero statement as the page heading', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/What you approve in Figma is what goes live\./i)
  })

  it('renders exactly one h1', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('counts the live projects in the hero CTA from the case data', () => {
    render(<App />)
    expect(
      screen.getByRole('link', { name: new RegExp(`See ${cases.length} live projects`) }),
    ).toHaveAttribute('href', '#work')
  })

  it('uses one label for the contact intent in the hero and the primary nav', () => {
    render(<App />)
    const primary = screen.getByRole('navigation', { name: 'Primary' })
    expect(within(primary).getByRole('link', { name: 'Tell me about your project' })).toHaveAttribute(
      'href',
      '#contact',
    )
    expect(screen.queryByText(/Start a project/i)).not.toBeInTheDocument()
  })

  it('carries no AI-tell phrasing in the hero', () => {
    render(<App />)
    expect(screen.queryByText(/rare combo|telephone game/i)).not.toBeInTheDocument()
  })

  it('renders the designer-who-ships pitch', () => {
    render(<App />)
    // The phrase appears in the hero statement and is echoed in the footer.
    expect(screen.getAllByText(/idea to live/i).length).toBeGreaterThan(0)
  })

  it('wires the primary nav "Work" link to the work section', () => {
    render(<App />)
    const primary = screen.getByRole('navigation', { name: 'Primary' })
    expect(within(primary).getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work')
  })

  it('renders the About, Contact and Footer landmarks', () => {
    const { container } = render(<App />)
    expect(container.querySelector('#about')).toBeInTheDocument()
    expect(container.querySelector('#contact')).toBeInTheDocument()
    expect(container.querySelector('footer')).toBeInTheDocument()
  })
})
