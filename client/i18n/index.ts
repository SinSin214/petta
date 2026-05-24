import enDictionary from '@/i18n/locales/en.json';
import vnDictionary from '@/i18n/locales/vn.json';

export const I18N_STORAGE_KEY = 'petta.locale';

export const SUPPORTED_LOCALES = ['en', 'vn'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

const dictionaries = {
  en: enDictionary,
  vn: vnDictionary,
} as const;

const DEFAULT_LOCALE: Locale = 'en';

const isRecord = (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object' && value !== null
);

const interpolate = (text: string, params?: Record<string, string | number>): string => {
  if (!params) {
    return text;
  }

  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? `{${key}}`));
};

export const normalizeLocale = (value?: string | null): Locale => {
  if (!value) {
    return DEFAULT_LOCALE;
  }

  const normalized = value.toLowerCase();
  return (SUPPORTED_LOCALES as readonly string[]).includes(normalized) ? (normalized as Locale) : DEFAULT_LOCALE;
};

export const getDictionary = (locale: Locale) => dictionaries[locale];

export const t = (locale: Locale, key: string, params?: Record<string, string | number>): string => {
  const dictionary = getDictionary(locale);
  const segments = key.split('.');

  let current: unknown = dictionary;
  for (const segment of segments) {
    if (!isRecord(current)) {
      return key;
    }

    current = current[segment];
  }

  if (typeof current !== 'string') {
    return key;
  }

  return interpolate(current, params);
};

export const translateMessageCode = (locale: Locale, code?: string | null): string => {
  if (!code) {
    return t(locale, 'messages.codes.GENERIC_ERROR');
  }

  const translated = t(locale, `messages.codes.${code}`);
  return translated === `messages.codes.${code}` ? t(locale, 'messages.codes.GENERIC_ERROR') : translated;
};

export const toErrorCode = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return undefined;
};
