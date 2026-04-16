// TODO(phase4-consumer): replace inline types with @tn-figueiredo/auth-nextjs@^2.1.0 import
// Phase 1 (auth-nextjs 2.1.0) is not yet published to GitHub Packages. Once it ships, the
// consumer-wiring phase should drop these local interfaces and import the canonical shapes
// from `@tn-figueiredo/auth-nextjs/actions`, and add `@tn-figueiredo/auth-nextjs` as a peer
// dependency (>= 2.1.0) in `package.json`.

import type { ReactNode } from 'react'

// ---------------------------------------------------------------------------
// Minimal action result type (matches @tn-figueiredo/auth-nextjs@2.1.0 shape)
// ---------------------------------------------------------------------------
export interface ActionResult {
  ok: boolean
  error?: string
  url?: string   // used by signInWithGoogle to return the OAuth redirect URL
  userId?: string
}

export interface SignInPasswordInput {
  email: string
  password: string
  turnstileToken?: string | null
}

export interface SignInGoogleInput {
  redirectTo?: string
}

export interface ForgotPasswordInput {
  email: string
  turnstileToken?: string | null
}

export interface ResetPasswordInput {
  password: string
}

// ---------------------------------------------------------------------------
// Component prop interfaces — shared contract for all six auth components
// (admin and cms share the same interface shape; only defaults differ)
// ---------------------------------------------------------------------------
export interface AuthTheme {
  /** Page background — maps to --auth-bg */
  bg: string
  /** Card background — maps to --auth-card-bg */
  card: string
  /** Primary action color — maps to --auth-accent */
  accent: string
  /** Primary action hover — maps to --auth-accent-hover */
  accentHover: string
  /** Primary text — maps to --auth-text */
  text: string
  /** Secondary/hint text — maps to --auth-muted */
  muted: string
  /** Input and card border — maps to --auth-border */
  border: string
}

export interface AuthStrings {
  title: string
  subtitle: string
  signInButton: string
  googleButton: string
  googleButtonLoading: string
  loading: string
  forgotPasswordLink: string
  emailLabel: string
  emailPlaceholder: string
  passwordLabel: string
  passwordPlaceholder: string
  /** aria-label when password is hidden */
  passwordTogglePassive: string
  /** aria-label when password is visible */
  passwordToggleActive: string
  divider: string
  errorGeneric: string
  errorInvalidCredentials: string
  errorTurnstileLoading: string
}

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

export interface AuthPageProps {
  /** Required: auth actions wired up by consumer page */
  actions: {
    signInWithPassword: (input: SignInPasswordInput) => Promise<ActionResult>
    signInWithGoogle: (input: SignInGoogleInput) => Promise<ActionResult>
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
    forgotPassword: (input: ForgotPasswordInput) => Promise<ActionResult>
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
    resetPassword: (input: ResetPasswordInput) => Promise<ActionResult>
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
