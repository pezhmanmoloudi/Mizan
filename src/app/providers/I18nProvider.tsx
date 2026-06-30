import { type ReactNode, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';

import { i18n, initI18n } from '@/localization';

/** Ensures i18next is initialized before rendering and exposes it to the tree. */
export function I18nProvider({ children }: { children: ReactNode }) {
  const instance = useMemo(() => initI18n(), []);
  return <I18nextProvider i18n={instance ?? i18n}>{children}</I18nextProvider>;
}
