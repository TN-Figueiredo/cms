'use client'

import { useState, useEffect, useRef, useId } from 'react'
import { getCmsForgotPasswordStrings } from './strings'
import { CMS_THEME_DEFAULT } from './types'
import type { ForgotPasswordPageProps, AuthTheme, ForgotPasswordStrings } from './types'

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

declare global {
  interface Window {
    turnstile?: {
      render(el: HTMLElement, opts: { sitekey: string; callback: (t: string) => void }): string
      reset(id?: string): void
    }
  }
}

export function CmsForgotPassword({
  actions,
  strings: stringOverrides,
  locale = 'pt-BR',
  logo,
  footer,
  theme: themeOverride,
  loginPath = '/cms/login',
  turnstile,
}: ForgotPasswordPageProps) {
  const baseStrings = getCmsForgotPasswordStrings(locale)
  const s: ForgotPasswordStrings = { ...baseStrings, ...stringOverrides }
  const theme: AuthTheme = { ...CMS_THEME_DEFAULT, ...themeOverride }

  const [email, setEmail] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const errorId = useId()
  const emailId = useId()

  useEffect(() => {
    if (!turnstile?.siteKey || !turnstileRef.current) return
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.turnstile && turnstileRef.current) {
        const id = window.turnstile.render(turnstileRef.current, {
          sitekey: turnstile.siteKey,
          callback: (t) => setTurnstileToken(t),
        })
        widgetIdRef.current = id
      }
    }
    document.head.appendChild(script)
    return () => { script.remove() }
  }, [turnstile?.siteKey])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (turnstile && !turnstileToken) {
      setError(s.errorTurnstileLoading)
      return
    }
    setLoading(true)
    try {
      // Fire and forget — always show generic success (anti-enumeration: C2)
      await actions.forgotPassword({
        email,
        turnstileToken: turnstileToken ?? undefined,
      })
      setSent(true)
    } catch {
      // Even on unexpected errors, show success to prevent enumeration
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  const isSubmitDisabled = loading || Boolean(turnstile && !turnstileToken)

  if (sent) {
    return (
      <div
        style={buildThemeVars(theme)}
        className="min-h-screen flex items-center justify-center px-4 bg-[var(--auth-bg)]"
      >
        <div className="max-w-md w-full text-center">
          {logo && <div className="flex justify-center mb-6">{logo}</div>}
          <h1 className="text-2xl font-bold text-[var(--auth-text)] mb-4">{s.successTitle}</h1>
          <p className="text-[var(--auth-muted)]">{s.successBody}</p>
          <a
            href={loginPath}
            className="mt-6 inline-block text-sm text-[var(--auth-muted)] hover:underline"
          >
            {s.backToLogin}
          </a>
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
          <p className="text-[var(--auth-muted)] text-sm mt-1">{s.subtitle}</p>
        </div>

        <div
          className="rounded-xl border p-8 shadow-sm"
          style={{ backgroundColor: 'var(--auth-card-bg)', borderColor: 'var(--auth-border)' }}
        >
          {error && (
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
            <div>
              <label
                htmlFor={emailId}
                className="block text-sm font-medium mb-1 text-[var(--auth-text)]"
              >
                {s.emailLabel}
              </label>
              <input
                id={emailId}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={s.emailPlaceholder}
                autoComplete="email"
                required
                aria-describedby={error ? errorId : undefined}
                className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2"
                style={{ borderColor: 'var(--auth-border)', color: 'var(--auth-text)' }}
              />
            </div>

            {turnstile && (
              <div ref={turnstileRef} data-turnstile-container="true" />
            )}

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="w-full text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
              style={{ backgroundColor: 'var(--auth-accent)' }}
            >
              {loading ? s.submittingButton : s.submitButton}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a
              href={loginPath}
              className="text-sm text-[var(--auth-muted)] hover:underline"
            >
              {s.backToLogin}
            </a>
          </div>
        </div>

        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  )
}
