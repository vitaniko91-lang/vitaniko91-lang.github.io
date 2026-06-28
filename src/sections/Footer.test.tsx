import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'

describe('Footer', () => {
  it('is a semantic footer with the wordmark and one-line pitch', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
    expect(screen.getByText('Vitalina Nikulina')).toBeInTheDocument()
    expect(screen.getByText(/idea to live\./i)).toBeInTheDocument()
  })

  it('renders the build credit', () => {
    render(<Footer />)
    expect(
      screen.getByText('Designed & built by Vitalina Nikulina · 2026'),
    ).toBeInTheDocument()
  })

  it('renders a back-to-top link pointing at the hero', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /back to top/i })).toHaveAttribute('href', '#top')
  })

  it('repeats the real GitHub link in a new tab', () => {
    render(<Footer />)
    const github = screen.getByRole('link', { name: /GitHub/i })
    expect(github).toHaveAttribute('href', 'https://github.com/vitaniko91-lang')
    expect(github).toHaveAttribute('target', '_blank')
  })
})
