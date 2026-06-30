// Not `as const`: keys define the translation schema (used for `t()` typing), while
// values stay `string` so other locales can supply different copy.
export const en = {
  common: {
    appName: 'Mizan',
    save: 'Save',
    cancel: 'Cancel',
    retry: 'Retry',
    loading: 'Loading…',
    back: 'Back',
  },
  errors: {
    generic: 'Something went wrong.',
    boundary: 'The app hit an unexpected error.',
  },
  tabs: {
    home: 'Home',
    transactions: 'Activity',
    insights: 'Insights',
    profile: 'Profile',
  },
  home: {
    title: 'Overview',
    subtitle: 'Your expenses, balanced.',
    balanceLabel: 'Total balance',
    income: 'Income',
    expense: 'Expenses',
    weeklyTrend: 'Weekly trend',
    recent: 'Recent transactions',
    seeAll: 'See all',
    // Comma-separated short weekday labels, week start → end.
    weekdays: 'S,S,M,T,W,T,F',
  },
  transactions: {
    title: 'Activity',
    empty: {
      title: 'No transactions yet',
      description: 'Your transactions will appear here once you add them.',
    },
  },
  insights: {
    title: 'Insights',
    empty: {
      title: 'No insights yet',
      description: 'Add a few transactions to see spending insights.',
    },
  },
  profile: {
    title: 'Profile',
    openSettings: 'Open settings',
  },
  settings: {
    title: 'Settings',
    theme: {
      label: 'Appearance',
      system: 'System',
      light: 'Light',
      dark: 'Dark',
    },
    direction: {
      label: 'Layout direction',
      system: 'Auto',
      ltr: 'LTR',
      rtl: 'RTL',
    },
  },
  addTransaction: {
    title: 'Add transaction',
    amount: 'Amount',
    amountPlaceholder: '0.00',
    note: 'Note',
    notePlaceholder: 'What was this for?',
  },
  categories: {
    // Default (seeded) category names. Keys match `database/seeds/defaultCategories`.
    defaults: {
      food: 'Food',
      transport: 'Transport',
      shopping: 'Shopping',
      bills: 'Bills',
      health: 'Health',
      entertainment: 'Entertainment',
      other: 'Other',
    },
  },
};
