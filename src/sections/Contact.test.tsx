import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Contact } from './Contact'
import { EMAIL } from '../data/contact'

describe('Contact — closing CTA', () => {
  it('renders the big confident invitation', () => {
    render(<Contact />)
    expect(
      screen.getByRole('heading', { level: 2, name: /have a project\? let’s build it\./i }),
    ).toBeInTheDocument()
  })

  it('exposes the email as a mailto link', () => {
    render(<Contact />)
    const email = screen.getByRole('link', { name: `Email ${EMAIL}` })
    expect(email).toHaveAttribute('href', `mailto:${EMAIL}`)
  })

  it('links to the real GitHub profile in a new tab with a safe rel', () => {
    render(<Contact />)
    const github = screen.getByRole('link', { name: /GitHub/i })
    expect(github).toHaveAttribute('href', 'https://github.com/vitaniko91-lang')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('renders all four social links', () => {
    render(<Contact />)
    for (const label of [/^X/i, /GitHub/i, /LinkedIn/i, /Behance/i]) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })
})
