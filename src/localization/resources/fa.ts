import type { en } from './en';

// Persian translations mirror the English resource shape exactly (enforced by the type).
export const fa: typeof en = {
  common: {
    appName: 'میزان',
    save: 'ذخیره',
    cancel: 'انصراف',
    retry: 'تلاش دوباره',
    loading: 'در حال بارگذاری…',
  },
  errors: {
    generic: 'خطایی رخ داد.',
    boundary: 'برنامه با خطای غیرمنتظره مواجه شد.',
  },
  home: {
    title: 'نمای کلی',
    subtitle: 'هزینه‌های شما، متوازن.',
  },
};
