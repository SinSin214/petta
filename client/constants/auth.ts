export const AUTH_MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT: 'forgot',
} as const;

export const OPEN_AUTH_MODAL_EVENT = 'petta:open-auth-modal';

export type AuthMode = (typeof AUTH_MODE)[keyof typeof AUTH_MODE];

export const AUTH_TABS: Array<{ key: AuthMode; label: string }> = [
  { key: AUTH_MODE.LOGIN, label: 'Login' },
  { key: AUTH_MODE.REGISTER, label: 'Register' },
  { key: AUTH_MODE.FORGOT, label: 'Forgot password' },
];
