import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the confident hero statement as the page heading', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/I design and ship/i)
  })

  it('renders exactly one h1', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
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
