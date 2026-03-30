export const AuthCode = {
  UsedEmail: 'UsedEmail',
  InvalidCredentials: 'InvalidCredentials',
  InvalidAccessToken: 'InvalidAccessToken',
  InvalidRefreshToken: 'InvalidRefreshToken',
  UserNotFound: 'UserNotFound',
  ResetLinkSent: 'ResetLinkSent',
  InvalidOrExpiredResetToken: 'InvalidOrExpiredResetToken',
  PasswordResetSuccess: 'PasswordResetSuccess',
  LoggedOutSuccess: 'LoggedOutSuccess',
} as const;

export type AuthCode = (typeof AuthCode)[keyof typeof AuthCode];
