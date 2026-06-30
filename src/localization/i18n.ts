import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { type AppLocale, RTL_LOCALES, SUPPORTED_LOCALES } from '@/constants';

import { defaultNS, resources } from './resources';

/** Resolves the best supported locale from the device, falling back to English. */
export function resolveDeviceLocale(): AppLocale {
  const deviceTag = Localization.getLocales()[0]?.languageCode ?? 'en';
  return (SUPPORTED_LOCALES as readonly string[]).includes(deviceTag)
    ? (deviceTag as AppLocale)
    : 'en';
}

export function isRtlLocale(locale: AppLocale): boolean {
  return RTL_LOCALES.includes(locale);
}

let initialized = false;

/** Initializes i18next once. Safe to call from app bootstrap. */
export function initI18n(locale: AppLocale = resolveDeviceLocale()) {
  if (initialized) return i18n;
  // eslint-disable-next-line import/no-named-as-default-member
  void i18n.use(initReactI18next).init({
    resources,
    defaultNS,
    lng: locale,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    returnNull: false,
  });
  initialized = true;
  return i18n;
}

export { i18n };
