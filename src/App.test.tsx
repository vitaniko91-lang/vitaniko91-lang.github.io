import { render, screen } from '@testing-library/react'
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
    expect(screen.getByText(/idea to live/i)).toBeInTheDocument()
  })

  it('wires the primary nav "Work" link to the work section', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work')
  })
})
