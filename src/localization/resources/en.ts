// Not `as const`: keys define the translation schema (used for `t()` typing), while
// values stay `string` so other locales can supply different copy.
export const en = {
  common: {
    appName: 'Mizan',
    save: 'Save',
    cancel: 'Cancel',
    retry: 'Retry',
    loading: 'Loading…',
  },
  errors: {
    generic: 'Something went wrong.',
    boundary: 'The app hit an unexpected error.',
  },
  home: {
    title: 'Overview',
    subtitle: 'Your expenses, balanced.',
  },
};
