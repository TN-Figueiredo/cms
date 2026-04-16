import { describe, it, expect } from 'vitest'

describe('getCmsAuthStrings', () => {
  it('returns pt-BR strings by default', async () => {
    const { getCmsAuthStrings } = await import('../../src/login/strings')
    const s = getCmsAuthStrings('pt-BR')
    expect(s.title).toBe('CMS')
    expect(s.subtitle).toBe('Estúdio de conteúdo')
    expect(s.signInButton).toBe('Entrar')
    expect(s.googleButton).toBe('Entrar com Google')
    expect(s.divider).toBe('ou')
    expect(s.errorInvalidCredentials).toBe('Email ou senha inválidos')
  })

  it('returns en strings', async () => {
    const { getCmsAuthStrings } = await import('../../src/login/strings')
    const s = getCmsAuthStrings('en')
    expect(s.title).toBe('CMS')
    expect(s.subtitle).toBe('Content studio')
    expect(s.signInButton).toBe('Sign in')
    expect(s.googleButton).toBe('Sign in with Google')
    expect(s.divider).toBe('or')
    expect(s.errorInvalidCredentials).toBe('Invalid email or password')
  })

  it('falls back to pt-BR for unknown locale', async () => {
    const { getCmsAuthStrings } = await import('../../src/login/strings')
    const s = getCmsAuthStrings('fr')
    expect(s.signInButton).toBe('Entrar')
  })

  it('includes all required AuthStrings keys', async () => {
    const { getCmsAuthStrings } = await import('../../src/login/strings')
    const s = getCmsAuthStrings('pt-BR')
    const requiredKeys: (keyof import('../../src/login/types').AuthStrings)[] = [
      'title', 'subtitle', 'signInButton', 'googleButton', 'googleButtonLoading',
      'loading', 'forgotPasswordLink', 'emailLabel', 'emailPlaceholder',
      'passwordLabel', 'passwordPlaceholder', 'passwordTogglePassive',
      'passwordToggleActive', 'divider', 'errorGeneric', 'errorInvalidCredentials',
      'errorTurnstileLoading',
    ]
    for (const key of requiredKeys) {
      expect(s[key], `missing key: ${key}`).toBeTruthy()
    }
  })

  it('getCmsForgotPasswordStrings returns pt-BR forgot strings', async () => {
    const { getCmsForgotPasswordStrings } = await import('../../src/login/strings')
    const s = getCmsForgotPasswordStrings('pt-BR')
    expect(s.title).toBe('Esqueci minha senha')
    expect(s.submitButton).toBe('Enviar link')
    expect(s.successTitle).toBe('Verifique seu email')
    expect(s.backToLogin).toBe('Voltar para o login')
  })

  it('getCmsForgotPasswordStrings returns en forgot strings', async () => {
    const { getCmsForgotPasswordStrings } = await import('../../src/login/strings')
    const s = getCmsForgotPasswordStrings('en')
    expect(s.title).toBe('Forgot password')
    expect(s.submitButton).toBe('Send link')
    expect(s.successTitle).toBe('Check your email')
  })

  it('getCmsResetPasswordStrings returns pt-BR reset strings', async () => {
    const { getCmsResetPasswordStrings } = await import('../../src/login/strings')
    const s = getCmsResetPasswordStrings('pt-BR')
    expect(s.title).toBe('Nova senha')
    expect(s.submitButton).toBe('Atualizar senha')
    expect(s.errorPasswordMismatch).toBe('Senhas não coincidem.')
  })

  it('getCmsResetPasswordStrings returns en reset strings', async () => {
    const { getCmsResetPasswordStrings } = await import('../../src/login/strings')
    const s = getCmsResetPasswordStrings('en')
    expect(s.title).toBe('New password')
    expect(s.submitButton).toBe('Update password')
    expect(s.errorPasswordMismatch).toBe("Passwords don't match.")
  })
})
