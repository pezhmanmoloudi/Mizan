import type { en } from './resources/en';

// Gives `t('...')` autocompletion and key-checking against the English resource shape.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: typeof en };
  }
}
