export const AUTH_MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT: 'forgot',
  NEW_PASSWORD: 'new_password',
} as const;

export const OPEN_AUTH_MODAL_EVENT = 'openAuthModal';

export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
} as const;

export type AuthMode = (typeof AUTH_MODE)[keyof typeof AUTH_MODE];

export const AUTH_TABS: Array<{ key: AuthMode; label: string }> = [
  { key: AUTH_MODE.LOGIN, label: 'Login' },
  { key: AUTH_MODE.REGISTER, label: 'Register' },
  { key: AUTH_MODE.FORGOT, label: 'Forgot password' },
  { key: AUTH_MODE.NEW_PASSWORD, label: 'New password' },
];
