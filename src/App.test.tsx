import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the Vitalina Nikulina wordmark as the page heading', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Vitalina Nikulina')
  })

  it('renders the designer-who-ships pitch', () => {
    render(<App />)
    expect(
      screen.getByText(/idea to live/i),
    ).toBeInTheDocument()
  })
})
