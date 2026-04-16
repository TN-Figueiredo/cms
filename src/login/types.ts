// Canonical auth types live in @tn-figueiredo/auth-nextjs/actions (Phase 1 of the
// admin/cms login package-first split). This package re-exports the 7 shared
// primitives (action result + inputs + theme/strings atoms) so consumers can
// type wrapper server actions against the same source of truth.
//
// The 3 component-facing prop interfaces (AuthPageProps / ForgotPasswordPageProps /
// ResetPasswordPageProps) stay cms-local because component-facing action
// signatures are narrower than the canonical server-action inputs: e.g., a
// component call site does not know `appUrl` / `resetPath` — the consumer
// pre-binds those fields in a `'use server'` wrapper and hands a narrower
// fn to the component.

import type { ReactNode } from 'react'

// ---------------------------------------------------------------------------
// Canonical primitives re-exported from @tn-figueiredo/auth-nextjs/actions
// ---------------------------------------------------------------------------
export type {
  ActionResult,
  SignInPasswordInput,
  SignInGoogleInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  AuthTheme,
  AuthStrings,
} from '@tn-figueiredo/auth-nextjs/actions'

import type {
  ActionResult,
  AuthTheme,
  AuthStrings,
} from '@tn-figueiredo/auth-nextjs/actions'

// ---------------------------------------------------------------------------
// CMS-specific string sets for the sibling forgot/reset pages
// ---------------------------------------------------------------------------
export interface ForgotPasswordStrings {
  title: string
  subtitle: string
  emailLabel: string
  emailPlaceholder: string
  submitButton: string
  submittingButton: string
  successTitle: string
  successBody: string
  backToLogin: string
  errorTurnstileLoading: string
  errorGeneric: string
}

export interface ResetPasswordStrings {
  title: string
  waitingTitle: string
  waitingBody: string
  newPasswordLabel: string
  newPasswordPlaceholder: string
  confirmPasswordLabel: string
  confirmPasswordPlaceholder: string
  submitButton: string
  submittingButton: string
  errorPasswordMismatch: string
  errorPasswordWeak: string
  errorGeneric: string
  /** aria-label when password is hidden */
  passwordTogglePassive: string
  /** aria-label when password is visible */
  passwordToggleActive: string
}

// ---------------------------------------------------------------------------
// Component-facing prop interfaces
//
// Action sub-types narrow the canonical server-action inputs: the consumer
// pre-binds consumer-specific fields (`appUrl`, `resetPath`, `callbackPath`) in
// a `'use server'` wrapper and exposes narrower fn signatures to the component.
// ---------------------------------------------------------------------------
export interface AuthPageProps {
  /** Required: auth actions wired up by consumer page */
  actions: {
    signInWithPassword: (input: {
      email: string
      password: string
      turnstileToken?: string
    }) => Promise<ActionResult>
    signInWithGoogle: (input: {
      redirectTo?: string
    }) => Promise<ActionResult<{ url: string }>>
  }
  /** Partial override of the locale preset */
  strings?: Partial<AuthStrings>
  /** Selects a locale preset; ignored if `strings` covers all keys */
  locale?: 'pt-BR' | 'en'
  /** Slot rendered above the title */
  logo?: ReactNode
  /** Slot rendered below the form */
  footer?: ReactNode
  /** CSS variable overrides — merged onto top-level element via `style` */
  theme?: Partial<AuthTheme>
  /** Static post-login destination */
  redirectTo?: string
  /** Pre-fill email (invite flow) */
  emailHint?: string
  /** Error forwarded from auth callback query param */
  authError?: string
  /** When provided, Turnstile widget is mounted */
  turnstile?: { siteKey: string }
}

export interface ForgotPasswordPageProps {
  actions: {
    forgotPassword: (input: {
      email: string
      turnstileToken?: string
    }) => Promise<ActionResult>
  }
  strings?: Partial<ForgotPasswordStrings>
  locale?: 'pt-BR' | 'en'
  logo?: ReactNode
  footer?: ReactNode
  theme?: Partial<AuthTheme>
  loginPath?: string   // href for "back to login" link, default '/cms/login'
  turnstile?: { siteKey: string }
}

export interface ResetPasswordPageProps {
  actions: {
    resetPassword: (input: { password: string }) => Promise<ActionResult>
  }
  strings?: Partial<ResetPasswordStrings>
  locale?: 'pt-BR' | 'en'
  logo?: ReactNode
  footer?: ReactNode
  theme?: Partial<AuthTheme>
  redirectTo?: string  // post-reset destination, default '/cms'
  /** Consumer sets this to true after receiving PASSWORD_RECOVERY auth event */
  canReset?: boolean
}

// ---------------------------------------------------------------------------
// CMS default theme — stone-50 bg, zinc-900 accent (content-creator vibe)
// ---------------------------------------------------------------------------
export const CMS_THEME_DEFAULT: AuthTheme = {
  bg: '#fafaf9',
  card: '#ffffff',
  accent: '#18181b',
  accentHover: '#27272a',
  text: '#18181b',
  muted: '#71717a',
  border: '#e4e4e7',
}
