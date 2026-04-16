import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
import { CmsLogin } from '../../src/login/cms-login'
import type { AuthPageProps } from '../../src/login/types'

expect.extend({ toHaveNoViolations })

function makeActions(overrides: Partial<AuthPageProps['actions']> = {}): AuthPageProps['actions'] {
  return {
    signInWithPassword: vi.fn().mockResolvedValue({ ok: true, userId: 'u1' }),
    signInWithGoogle: vi.fn().mockResolvedValue({ ok: true, url: 'https://accounts.google.com/o/oauth2/v2/auth' }),
    ...overrides,
  }
}

describe('<CmsLogin>', () => {
  it('renders title and subtitle from default pt-BR strings', () => {
    render(<CmsLogin actions={makeActions()} />)
    expect(screen.getByText('CMS')).toBeTruthy()
    expect(screen.getByText('Estúdio de conteúdo')).toBeTruthy()
  })

  it('renders email and password fields with labels', () => {
    render(<CmsLogin actions={makeActions()} />)
    expect(screen.getByLabelText('Email')).toBeTruthy()
    expect(screen.getByLabelText('Senha')).toBeTruthy()
  })

  it('renders en strings when locale=en', () => {
    render(<CmsLogin actions={makeActions()} locale="en" />)
    expect(screen.getByText('Content studio')).toBeTruthy()
    expect(screen.getByRole('button', { name: /sign in with google/i })).toBeTruthy()
  })

  it('overrides title via strings prop', () => {
    render(<CmsLogin actions={makeActions()} strings={{ title: 'My Studio' }} />)
    expect(screen.getByText('My Studio')).toBeTruthy()
  })

  it('renders logo slot when provided', () => {
    render(<CmsLogin actions={makeActions()} logo={<img src="/logo.svg" alt="logo" />} />)
    expect(screen.getByRole('img', { name: 'logo' })).toBeTruthy()
  })

  it('renders footer slot when provided', () => {
    render(<CmsLogin actions={makeActions()} footer={<p>Footer text</p>} />)
    expect(screen.getByText('Footer text')).toBeTruthy()
  })

  it('pre-fills email when emailHint is provided', () => {
    render(<CmsLogin actions={makeActions()} emailHint="editor@example.com" />)
    const input = screen.getByLabelText('Email') as HTMLInputElement
    expect(input.value).toBe('editor@example.com')
  })

  it('displays authError when provided', () => {
    render(<CmsLogin actions={makeActions()} authError="some-error" />)
    expect(screen.getByRole('alert')).toBeTruthy()
  })

  it('calls signInWithPassword on form submit', async () => {
    const actions = makeActions()
    render(<CmsLogin actions={actions} />)
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'editor@example.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: /^entrar$/i }))
    await waitFor(() => expect(actions.signInWithPassword).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'editor@example.com', password: 'password123' })
    ))
  })

  it('shows loading state during submit', async () => {
    let resolve: (v: { ok: boolean }) => void
    const pending = new Promise<{ ok: boolean }>((r) => { resolve = r })
    const actions = makeActions({ signInWithPassword: vi.fn().mockReturnValue(pending) })
    render(<CmsLogin actions={actions} />)
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'a@b.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'pass1234' } })
    fireEvent.click(screen.getByRole('button', { name: /^entrar$/i }))
    await waitFor(() => expect(screen.getByRole('button', { name: /entrando/i })).toBeTruthy())
    act(() => resolve!({ ok: true }))
  })

  it('displays error message on failed sign in', async () => {
    const actions = makeActions({
      signInWithPassword: vi.fn().mockResolvedValue({ ok: false, error: 'Email ou senha inválidos' }),
    })
    render(<CmsLogin actions={actions} />)
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'bad@example.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'wrongpass' } })
    fireEvent.click(screen.getByRole('button', { name: /^entrar$/i }))
    await waitFor(() => expect(screen.getByRole('alert')).toBeTruthy())
    expect(screen.getByText('Email ou senha inválidos')).toBeTruthy()
  })

  it('calls signInWithGoogle when Google button is clicked', async () => {
    const actions = makeActions()
    render(<CmsLogin actions={actions} />)
    fireEvent.click(screen.getByRole('button', { name: /entrar com google/i }))
    await waitFor(() => expect(actions.signInWithGoogle).toHaveBeenCalled())
  })

  it('password visibility toggle changes input type', () => {
    render(<CmsLogin actions={makeActions()} />)
    const passwordInput = screen.getByLabelText('Senha') as HTMLInputElement
    expect(passwordInput.type).toBe('password')
    // Find toggle by aria-label
    const toggle = screen.getByLabelText('Mostrar senha')
    fireEvent.click(toggle)
    expect(passwordInput.type).toBe('text')
    expect(screen.getByLabelText('Ocultar senha')).toBeTruthy()
  })

  it('applies custom theme via CSS variables', () => {
    const { container } = render(
      <CmsLogin actions={makeActions()} theme={{ accent: '#ff0000', bg: '#000000' }} />
    )
    const root = container.firstElementChild as HTMLElement
    expect(root.style.getPropertyValue('--auth-accent')).toBe('#ff0000')
    expect(root.style.getPropertyValue('--auth-bg')).toBe('#000000')
  })

  it('applies default theme CSS variables', () => {
    const { container } = render(<CmsLogin actions={makeActions()} />)
    const root = container.firstElementChild as HTMLElement
    expect(root.style.getPropertyValue('--auth-bg')).toBe('#fafaf9')
    expect(root.style.getPropertyValue('--auth-accent')).toBe('#18181b')
  })

  it('renders Turnstile container when turnstile prop is set', () => {
    render(<CmsLogin actions={makeActions()} turnstile={{ siteKey: 'test-key' }} />)
    // Turnstile div should be present (widget mounts via script; here just div renders)
    expect(document.querySelector('[data-turnstile-container]')).toBeTruthy()
  })

  it('has no axe violations with default props', async () => {
    const { container } = render(<CmsLogin actions={makeActions()} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no axe violations with custom theme', async () => {
    const { container } = render(
      <CmsLogin
        actions={makeActions()}
        theme={{ accent: '#18181b', bg: '#fafaf9', card: '#ffffff', text: '#18181b', muted: '#71717a', border: '#e4e4e7', accentHover: '#27272a' }}
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('error container has aria-live=polite', async () => {
    const actions = makeActions({
      signInWithPassword: vi.fn().mockResolvedValue({ ok: false, error: 'Bad credentials' }),
    })
    render(<CmsLogin actions={actions} />)
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'x@x.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'pass1234' } })
    fireEvent.click(screen.getByRole('button', { name: /^entrar$/i }))
    await waitFor(() => screen.getByRole('alert'))
    const alert = screen.getByRole('alert')
    expect(alert.getAttribute('aria-live')).toBe('polite')
  })

  it('password input has aria-invalid when error is present', async () => {
    const actions = makeActions({
      signInWithPassword: vi.fn().mockResolvedValue({ ok: false, error: 'Email ou senha inválidos' }),
    })
    render(<CmsLogin actions={actions} />)
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'x@x.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'pass1234' } })
    fireEvent.click(screen.getByRole('button', { name: /^entrar$/i }))
    await waitFor(() => screen.getByRole('alert'))
    const passwordInput = screen.getByLabelText('Senha')
    expect(passwordInput.getAttribute('aria-invalid')).toBe('true')
  })

  it('safeRedirect: redirectTo prop is accessible (component renders)', () => {
    // Component must accept and store redirectTo without throwing
    const { container } = render(
      <CmsLogin actions={makeActions()} redirectTo="/cms/campaigns" />
    )
    expect(container.firstChild).toBeTruthy()
  })
})
