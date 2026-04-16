'use client'

import { useState, useId } from 'react'
import { getCmsResetPasswordStrings } from './strings'
import { CMS_THEME_DEFAULT } from './types'
import type { ResetPasswordPageProps, AuthTheme, ResetPasswordStrings } from './types'

function buildThemeVars(theme: AuthTheme): React.CSSProperties {
  return {
    '--auth-bg': theme.bg,
    '--auth-card-bg': theme.card,
    '--auth-accent': theme.accent,
    '--auth-accent-hover': theme.accentHover,
    '--auth-text': theme.text,
    '--auth-muted': theme.muted,
    '--auth-border': theme.border,
  } as React.CSSProperties
}

function EyeIcon({ open }: { open: boolean }) {
  if (!open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" />
      </svg>
    )
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )
}

function validatePassword(pw: string, s: ResetPasswordStrings): string | null {
  if (pw.length < 8) return s.errorPasswordWeak
  if (!/[A-Za-z]/.test(pw)) return s.errorPasswordWeak
  if (!/\d/.test(pw)) return s.errorPasswordWeak
  return null
}

export function CmsResetPassword({
  actions,
  strings: stringOverrides,
  locale = 'pt-BR',
  logo,
  footer,
  theme: themeOverride,
  redirectTo = '/cms',
  canReset = false,
}: ResetPasswordPageProps) {
  const baseStrings = getCmsResetPasswordStrings(locale)
  const s: ResetPasswordStrings = { ...baseStrings, ...stringOverrides }
  const theme: AuthTheme = { ...CMS_THEME_DEFAULT, ...themeOverride }

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const errorId = useId()
  const newPasswordId = useId()
  const confirmPasswordId = useId()

  const hasError = Boolean(error)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canReset) return
    setError(null)

    if (newPassword !== confirmPassword) {
      setError(s.errorPasswordMismatch)
      return
    }
    const validationErr = validatePassword(newPassword, s)
    if (validationErr) {
      setError(validationErr)
      return
    }

    setLoading(true)
    try {
      const result = await actions.resetPassword({ password: newPassword })
      if (!result.ok) {
        setError(result.error ?? s.errorGeneric)
      } else {
        window.location.href = redirectTo
      }
    } finally {
      setLoading(false)
    }
  }

  // Waiting state: no PASSWORD_RECOVERY event yet
  if (!canReset) {
    return (
      <div
        style={buildThemeVars(theme)}
        className="min-h-screen flex items-center justify-center px-4 bg-[var(--auth-bg)]"
      >
        <div className="max-w-md w-full text-center">
          {logo && <div className="flex justify-center mb-6">{logo}</div>}
          <h1 className="text-2xl font-bold text-[var(--auth-text)] mb-4">{s.waitingTitle}</h1>
          <p className="text-[var(--auth-muted)]">{s.waitingBody}</p>
          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </div>
    )
  }

  return (
    <div
      style={buildThemeVars(theme)}
      className="min-h-screen flex items-center justify-center px-4 bg-[var(--auth-bg)]"
    >
      <div className="max-w-md w-full">
        {logo && <div className="flex justify-center mb-6">{logo}</div>}

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--auth-text)]">{s.title}</h1>
        </div>

        <div
          className="rounded-xl border p-8 shadow-sm"
          style={{ backgroundColor: 'var(--auth-card-bg)', borderColor: 'var(--auth-border)' }}
        >
          {hasError && (
            <div
              id={errorId}
              role="alert"
              aria-live="polite"
              className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm"
            >
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {/* New password */}
            <div>
              <label
                htmlFor={newPasswordId}
                className="block text-sm font-medium mb-1 text-[var(--auth-text)]"
              >
                {s.newPasswordLabel}
              </label>
              <div className="relative">
                <input
                  id={newPasswordId}
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={s.newPasswordPlaceholder}
                  autoComplete="new-password"
                  required
                  aria-invalid={hasError ? 'true' : undefined}
                  aria-describedby={hasError ? errorId : undefined}
                  className="w-full border rounded-lg px-3 py-2.5 pr-10 text-sm outline-none focus:ring-2"
                  style={{ borderColor: 'var(--auth-border)', color: 'var(--auth-text)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  tabIndex={-1}
                  aria-label={showNew ? s.passwordToggleActive : s.passwordTogglePassive}
                  aria-pressed={showNew}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--auth-muted)] hover:text-[var(--auth-text)]"
                >
                  <EyeIcon open={showNew} />
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor={confirmPasswordId}
                className="block text-sm font-medium mb-1 text-[var(--auth-text)]"
              >
                {s.confirmPasswordLabel}
              </label>
              <div className="relative">
                <input
                  id={confirmPasswordId}
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={s.confirmPasswordPlaceholder}
                  autoComplete="new-password"
                  required
                  aria-invalid={hasError ? 'true' : undefined}
                  aria-describedby={hasError ? errorId : undefined}
                  className="w-full border rounded-lg px-3 py-2.5 pr-10 text-sm outline-none focus:ring-2"
                  style={{ borderColor: 'var(--auth-border)', color: 'var(--auth-text)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  tabIndex={-1}
                  aria-label={showConfirm ? s.passwordToggleActive : s.passwordTogglePassive}
                  aria-pressed={showConfirm}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--auth-muted)] hover:text-[var(--auth-text)]"
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
              style={{ backgroundColor: 'var(--auth-accent)' }}
            >
              {loading ? s.submittingButton : s.submitButton}
            </button>
          </form>
        </div>

        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  )
}
