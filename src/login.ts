// @tn-figueiredo/cms/login — CMS auth page components
// Client components only — isolated from the main barrel (Node-only MDX + editor deps)
export { CmsLogin } from './login/cms-login'
export { CmsForgotPassword } from './login/cms-forgot-password'
export { CmsResetPassword } from './login/cms-reset-password'
export { getCmsAuthStrings, getCmsForgotPasswordStrings, getCmsResetPasswordStrings } from './login/strings'
export type {
  AuthTheme,
  AuthStrings,
  ForgotPasswordStrings,
  ResetPasswordStrings,
  AuthPageProps,
  ForgotPasswordPageProps,
  ResetPasswordPageProps,
  ActionResult,
  SignInPasswordInput,
  SignInGoogleInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from './login/types'
export { CMS_THEME_DEFAULT } from './login/types'
