import type { AuthStrings, ForgotPasswordStrings, ResetPasswordStrings } from './types'

// ---------------------------------------------------------------------------
// Login strings
// ---------------------------------------------------------------------------
const loginPtBR: AuthStrings = {
  title: 'CMS',
  subtitle: 'Estúdio de conteúdo',
  signInButton: 'Entrar',
  googleButton: 'Entrar com Google',
  googleButtonLoading: 'Redirecionando…',
  loading: 'Entrando…',
  forgotPasswordLink: 'Esqueci minha senha',
  emailLabel: 'Email',
  emailPlaceholder: 'seu@email.com',
  passwordLabel: 'Senha',
  passwordPlaceholder: 'Sua senha',
  passwordTogglePassive: 'Mostrar senha',
  passwordToggleActive: 'Ocultar senha',
  divider: 'ou',
  errorGeneric: 'Erro na autenticação. Tente novamente.',
  errorInvalidCredentials: 'Email ou senha inválidos',
  errorTurnstileLoading: 'Verificação anti-bot ainda carregando.',
}

const loginEn: AuthStrings = {
  title: 'CMS',
  subtitle: 'Content studio',
  signInButton: 'Sign in',
  googleButton: 'Sign in with Google',
  googleButtonLoading: 'Redirecting…',
  loading: 'Signing in…',
  forgotPasswordLink: 'Forgot password',
  emailLabel: 'Email',
  emailPlaceholder: 'you@email.com',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Your password',
  passwordTogglePassive: 'Show password',
  passwordToggleActive: 'Hide password',
  divider: 'or',
  errorGeneric: 'Authentication error. Please try again.',
  errorInvalidCredentials: 'Invalid email or password',
  errorTurnstileLoading: 'Anti-bot verification still loading.',
}

const LOGIN_STRINGS: Record<string, AuthStrings> = {
  'pt-BR': loginPtBR,
  en: loginEn,
}

export function getCmsAuthStrings(locale: string): AuthStrings {
  return LOGIN_STRINGS[locale] ?? loginPtBR
}

// ---------------------------------------------------------------------------
// Forgot-password strings
// ---------------------------------------------------------------------------
const forgotPtBR: ForgotPasswordStrings = {
  title: 'Esqueci minha senha',
  subtitle: 'Informe seu email e enviaremos um link de recuperação.',
  emailLabel: 'Email',
  emailPlaceholder: 'seu@email.com',
  submitButton: 'Enviar link',
  submittingButton: 'Enviando…',
  successTitle: 'Verifique seu email',
  successBody: 'Se essa conta existir, enviamos um link de recuperação para o email informado.',
  backToLogin: 'Voltar para o login',
  errorTurnstileLoading: 'Verificação anti-bot ainda carregando.',
  errorGeneric: 'Não foi possível enviar o link. Tente novamente.',
}

const forgotEn: ForgotPasswordStrings = {
  title: 'Forgot password',
  subtitle: 'Enter your email and we will send a recovery link.',
  emailLabel: 'Email',
  emailPlaceholder: 'you@email.com',
  submitButton: 'Send link',
  submittingButton: 'Sending…',
  successTitle: 'Check your email',
  successBody: 'If that account exists, we sent a recovery link to the email provided.',
  backToLogin: 'Back to login',
  errorTurnstileLoading: 'Anti-bot verification still loading.',
  errorGeneric: 'Could not send the link. Please try again.',
}

const FORGOT_STRINGS: Record<string, ForgotPasswordStrings> = {
  'pt-BR': forgotPtBR,
  en: forgotEn,
}

export function getCmsForgotPasswordStrings(locale: string): ForgotPasswordStrings {
  return FORGOT_STRINGS[locale] ?? forgotPtBR
}

// ---------------------------------------------------------------------------
// Reset-password strings
// ---------------------------------------------------------------------------
const resetPtBR: ResetPasswordStrings = {
  title: 'Nova senha',
  waitingTitle: 'Nova senha',
  waitingBody: 'Use o link enviado por email para redefinir sua senha.',
  newPasswordLabel: 'Nova senha',
  newPasswordPlaceholder: 'Mínimo 8 caracteres',
  confirmPasswordLabel: 'Confirmar nova senha',
  confirmPasswordPlaceholder: 'Repita a senha',
  submitButton: 'Atualizar senha',
  submittingButton: 'Atualizando…',
  errorPasswordMismatch: 'Senhas não coincidem.',
  errorPasswordWeak: 'Senha muito fraca. Use ao menos 8 caracteres com letras e números.',
  errorGeneric: 'Não foi possível redefinir a senha. Tente novamente.',
  passwordTogglePassive: 'Mostrar senha',
  passwordToggleActive: 'Ocultar senha',
}

const resetEn: ResetPasswordStrings = {
  title: 'New password',
  waitingTitle: 'New password',
  waitingBody: 'Use the link sent to your email to reset your password.',
  newPasswordLabel: 'New password',
  newPasswordPlaceholder: 'Minimum 8 characters',
  confirmPasswordLabel: 'Confirm new password',
  confirmPasswordPlaceholder: 'Repeat password',
  submitButton: 'Update password',
  submittingButton: 'Updating…',
  errorPasswordMismatch: "Passwords don't match.",
  errorPasswordWeak: 'Password too weak. Use at least 8 characters with letters and numbers.',
  errorGeneric: 'Could not reset password. Please try again.',
  passwordTogglePassive: 'Show password',
  passwordToggleActive: 'Hide password',
}

const RESET_STRINGS: Record<string, ResetPasswordStrings> = {
  'pt-BR': resetPtBR,
  en: resetEn,
}

export function getCmsResetPasswordStrings(locale: string): ResetPasswordStrings {
  return RESET_STRINGS[locale] ?? resetPtBR
}
