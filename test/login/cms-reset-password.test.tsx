import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { toHaveNoViolations } from 'vitest-axe/matchers'
import { CmsResetPassword } from '../../src/login/cms-reset-password'
import type { ResetPasswordPageProps } from '../../src/login/types'

expect.extend({ toHaveNoViolations })

function makeActions(
  overrides: Partial<ResetPasswordPageProps['actions']> = {}
): ResetPasswordPageProps['actions'] {
  return {
    resetPassword: vi.fn().mockResolvedValue({ ok: true }),
    ...overrides,
  }
}

describe('<CmsResetPassword>', () => {
  it('shows waiting state when canReset=false (default)', () => {
    render(<CmsResetPassword actions={makeActions()} />)
    expect(screen.getByText('Use o link enviado por email para redefinir sua senha.')).toBeTruthy()
    expect(screen.queryByLabelText('Nova senha')).toBeNull()
  })

  it('shows the form when canReset=true', () => {
    render(<CmsResetPassword actions={makeActions()} canReset />)
    expect(screen.getByLabelText('Nova senha')).toBeTruthy()
    expect(screen.getByLabelText('Confirmar nova senha')).toBeTruthy()
  })

  it('renders en strings when locale=en with canReset=true', () => {
    render(<CmsResetPassword actions={makeActions()} canReset locale="en" />)
    expect(screen.getByLabelText('New password')).toBeTruthy()
    expect(screen.getByRole('button', { name: /update password/i })).toBeTruthy()
  })

  it('overrides strings via strings prop', () => {
    render(<CmsResetPassword actions={makeActions()} canReset strings={{ title: 'Set Password' }} />)
    expect(screen.getByText('Set Password')).toBeTruthy()
  })

  it('renders logo slot when provided', () => {
    render(<CmsResetPassword actions={makeActions()} canReset logo={<span data-testid="logo">L</span>} />)
    expect(screen.getByTestId('logo')).toBeTruthy()
  })

  it('shows error when passwords do not match', async () => {
    render(<CmsResetPassword actions={makeActions()} canReset />)
    fireEvent.change(screen.getByLabelText('Nova senha'), { target: { value: 'Pass1234' } })
    fireEvent.change(screen.getByLabelText('Confirmar nova senha'), { target: { value: 'Pass5678' } })
    fireEvent.click(screen.getByRole('button', { name: /atualizar senha/i }))
    await waitFor(() => expect(screen.getByRole('alert')).toBeTruthy())
    expect(screen.getByText('Senhas não coincidem.')).toBeTruthy()
  })

  it('shows error when password is too weak (< 8 chars)', async () => {
    render(<CmsResetPassword actions={makeActions()} canReset />)
    fireEvent.change(screen.getByLabelText('Nova senha'), { target: { value: 'abc' } })
    fireEvent.change(screen.getByLabelText('Confirmar nova senha'), { target: { value: 'abc' } })
    fireEvent.click(screen.getByRole('button', { name: /atualizar senha/i }))
    await waitFor(() => expect(screen.getByRole('alert')).toBeTruthy())
    expect(screen.getByText(/senha muito fraca/i)).toBeTruthy()
  })

  it('shows error when password has no numbers', async () => {
    render(<CmsResetPassword actions={makeActions()} canReset />)
    fireEvent.change(screen.getByLabelText('Nova senha'), { target: { value: 'abcdefgh' } })
    fireEvent.change(screen.getByLabelText('Confirmar nova senha'), { target: { value: 'abcdefgh' } })
    fireEvent.click(screen.getByRole('button', { name: /atualizar senha/i }))
    await waitFor(() => screen.getByRole('alert'))
    expect(screen.getByText(/senha muito fraca/i)).toBeTruthy()
  })

  it('calls resetPassword action with valid input', async () => {
    const actions = makeActions()
    render(<CmsResetPassword actions={actions} canReset />)
    fireEvent.change(screen.getByLabelText('Nova senha'), { target: { value: 'ValidPass1' } })
    fireEvent.change(screen.getByLabelText('Confirmar nova senha'), { target: { value: 'ValidPass1' } })
    fireEvent.click(screen.getByRole('button', { name: /atualizar senha/i }))
    await waitFor(() => expect(actions.resetPassword).toHaveBeenCalledWith(
      expect.objectContaining({ password: 'ValidPass1' })
    ))
  })

  it('shows loading state during submit', async () => {
    let resolve: (v: { ok: boolean }) => void
    const pending = new Promise<{ ok: boolean }>((r) => { resolve = r })
    const actions = makeActions({ resetPassword: vi.fn().mockReturnValue(pending) })
    render(<CmsResetPassword actions={actions} canReset />)
    fireEvent.change(screen.getByLabelText('Nova senha'), { target: { value: 'ValidPass1' } })
    fireEvent.change(screen.getByLabelText('Confirmar nova senha'), { target: { value: 'ValidPass1' } })
    fireEvent.click(screen.getByRole('button', { name: /atualizar senha/i }))
    await waitFor(() => expect(screen.getByRole('button', { name: /atualizando/i })).toBeTruthy())
    act(() => resolve!({ ok: true }))
  })

  it('displays action error from resetPassword result', async () => {
    const actions = makeActions({
      resetPassword: vi.fn().mockResolvedValue({ ok: false, error: 'A nova senha deve ser diferente da atual.' }),
    })
    render(<CmsResetPassword actions={actions} canReset />)
    fireEvent.change(screen.getByLabelText('Nova senha'), { target: { value: 'ValidPass1' } })
    fireEvent.change(screen.getByLabelText('Confirmar nova senha'), { target: { value: 'ValidPass1' } })
    fireEvent.click(screen.getByRole('button', { name: /atualizar senha/i }))
    await waitFor(() => screen.getByRole('alert'))
    expect(screen.getByText('A nova senha deve ser diferente da atual.')).toBeTruthy()
  })

  it('password visibility toggle works on new-password field', () => {
    render(<CmsResetPassword actions={makeActions()} canReset />)
    const input = screen.getByLabelText('Nova senha') as HTMLInputElement
    expect(input.type).toBe('password')
    const toggle = screen.getAllByLabelText('Mostrar senha')[0]!
    fireEvent.click(toggle)
    expect(input.type).toBe('text')
  })

  it('applies custom theme via CSS variables', () => {
    const { container } = render(
      <CmsResetPassword actions={makeActions()} canReset theme={{ accent: '#00ff00' }} />
    )
    const root = container.firstElementChild as HTMLElement
    expect(root.style.getPropertyValue('--auth-accent')).toBe('#00ff00')
  })

  it('has no axe violations on waiting state', async () => {
    const { container } = render(<CmsResetPassword actions={makeActions()} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no axe violations on form state', async () => {
    const { container } = render(<CmsResetPassword actions={makeActions()} canReset />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('error container has aria-live=polite', async () => {
    render(<CmsResetPassword actions={makeActions()} canReset />)
    fireEvent.change(screen.getByLabelText('Nova senha'), { target: { value: 'abc' } })
    fireEvent.change(screen.getByLabelText('Confirmar nova senha'), { target: { value: 'abc' } })
    fireEvent.click(screen.getByRole('button', { name: /atualizar senha/i }))
    await waitFor(() => screen.getByRole('alert'))
    expect(screen.getByRole('alert').getAttribute('aria-live')).toBe('polite')
  })
})
