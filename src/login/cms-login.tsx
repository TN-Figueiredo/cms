'use client'

import { useState, useEffect, useRef, useId } from 'react'
import { getCmsAuthStrings } from './strings'
import { CMS_THEME_DEFAULT } from './types'
import type { AuthPageProps, AuthTheme, AuthStrings } from './types'

// Google SVG icon (no external dep)
function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

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

export function CmsLogin({
  actions,
  strings: stringOverrides,
  locale = 'pt-BR',
  logo,
  footer,
  theme: themeOverride,
  redirectTo,
  emailHint,
  authError,
  turnstile,
}: AuthPageProps) {
  const baseStrings = getCmsAuthStrings(locale)
  const s: AuthStrings = { ...baseStrings, ...stringOverrides }
  const theme: AuthTheme = { ...CMS_THEME_DEFAULT, ...themeOverride }

  const [email, setEmail] = useState(emailHint ?? '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(authError ? s.errorGeneric : null)
  const [loading, setLoading] = useState(false)

  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const errorId = useId()
  const emailId = useId()
  const passwordId = useId()

  // Mount Turnstile when siteKey is provided
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

  function resetTurnstile() {
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current)
    }
    setTurnstileToken(null)
  }

  async function onPasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (turnstile && !turnstileToken) {
      setError(s.errorTurnstileLoading)
      return
    }
    setLoading(true)
    try {
      const result = await actions.signInWithPassword({
        email,
        password,
        turnstileToken: turnstileToken ?? undefined,
      })
      if (!result.ok) {
        setError(result.error ?? s.errorInvalidCredentials)
        resetTurnstile()
        // Focus first invalid input (a11y: focus management on error)
        emailInputRef.current?.focus()
      } else if (redirectTo) {
        window.location.href = redirectTo
      }
    } finally {
      setLoading(false)
    }
  }

  async function onGoogleClick() {
    setLoading(true)
    setError(null)
    const result = await actions.signInWithGoogle({ redirectTo })
    if (!result.ok) {
      setError(result.error || s.errorGeneric)
      setLoading(false)
      return
    }
    // Narrow via discriminated union: ok=true branch carries { url: string }
    if (result.url) window.location.href = result.url
  }

  const hasError = Boolean(error)
  const isSubmitDisabled = loading || Boolean(turnstile && !turnstileToken)

  return (
    <div
      style={buildThemeVars(theme)}
      className="min-h-screen flex items-center justify-center px-4 bg-[var(--auth-bg)]"
    >
      <div className="max-w-md w-full">
        {/* Logo slot */}
        {logo && <div className="flex justify-center mb-6">{logo}</div>}

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--auth-text)]">{s.title}</h1>
          <p className="text-[var(--auth-muted)] text-sm mt-1">{s.subtitle}</p>
        </div>

        {/* Card */}
        <div
          className="rounded-xl border p-8 shadow-sm"
          style={{ backgroundColor: 'var(--auth-card-bg)', borderColor: 'var(--auth-border)' }}
        >
          {/* Error alert */}
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

          {/* Google OAuth */}
          <button
            type="button"
            onClick={onGoogleClick}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 font-medium transition mb-6 disabled:opacity-50 hover:bg-gray-50"
            style={{ borderColor: 'var(--auth-border)' }}
          >
            <GoogleIcon />
            {loading ? s.googleButtonLoading : s.googleButton}
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div
                className="w-full border-t"
                style={{ borderColor: 'var(--auth-border)' }}
              />
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-4 text-[var(--auth-muted)]"
                style={{ backgroundColor: 'var(--auth-card-bg)' }}
              >
                {s.divider}
              </span>
            </div>
          </div>

          {/* Email/password form */}
          <form onSubmit={onPasswordSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor={emailId}
                className="block text-sm font-medium mb-1 text-[var(--auth-text)]"
              >
                {s.emailLabel}
              </label>
              <input
                id={emailId}
                ref={emailInputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={s.emailPlaceholder}
                autoComplete="email"
                required
                aria-invalid={hasError ? 'true' : undefined}
                aria-describedby={hasError ? errorId : undefined}
                className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2"
                style={{ borderColor: 'var(--auth-border)', color: 'var(--auth-text)' }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor={passwordId}
                className="block text-sm font-medium mb-1 text-[var(--auth-text)]"
              >
                {s.passwordLabel}
              </label>
              <div className="relative">
                <input
                  id={passwordId}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={s.passwordPlaceholder}
                  autoComplete="current-password"
                  required
                  aria-invalid={hasError ? 'true' : undefined}
                  aria-describedby={hasError ? errorId : undefined}
                  className="w-full border rounded-lg px-3 py-2.5 pr-10 text-sm outline-none focus:ring-2"
                  style={{ borderColor: 'var(--auth-border)', color: 'var(--auth-text)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? s.passwordToggleActive : s.passwordTogglePassive}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--auth-muted)] hover:text-[var(--auth-text)]"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="text-right mt-1">
                <a
                  href="/cms/forgot"
                  className="text-sm text-[var(--auth-muted)] hover:underline"
                >
                  {s.forgotPasswordLink}
                </a>
              </div>
            </div>

            {/* Turnstile */}
            {turnstile && (
              <div ref={turnstileRef} data-turnstile-container="true" />
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="w-full text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
              style={{
                backgroundColor: 'var(--auth-accent)',
              }}
            >
              {loading ? s.loading : s.signInButton}
            </button>
          </form>
        </div>

        {/* Footer slot */}
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  )
}
