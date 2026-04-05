export const AUTH_MODE = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  FORGOT: 'forgot',
} as const;

export type AuthMode = (typeof AUTH_MODE)[keyof typeof AUTH_MODE];

export const AUTH_TABS: Array<{ key: AuthMode; label: string }> = [
  { key: AUTH_MODE.LOGIN, label: 'Login' },
  { key: AUTH_MODE.SIGNUP, label: 'Sign up' },
  { key: AUTH_MODE.FORGOT, label: 'Forgot password' },
];
