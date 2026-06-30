import type { en } from './en';

// Persian translations mirror the English resource shape exactly (enforced by the type).
export const fa: typeof en = {
  common: {
    appName: 'میزان',
    save: 'ذخیره',
    cancel: 'انصراف',
    retry: 'تلاش دوباره',
    loading: 'در حال بارگذاری…',
    back: 'بازگشت',
  },
  errors: {
    generic: 'خطایی رخ داد.',
    boundary: 'برنامه با خطای غیرمنتظره مواجه شد.',
  },
  tabs: {
    home: 'خانه',
    transactions: 'فعالیت',
    insights: 'تحلیل‌ها',
    profile: 'پروفایل',
  },
  home: {
    title: 'نمای کلی',
    subtitle: 'هزینه‌های شما، متوازن.',
    balanceLabel: 'موجودی کل',
    income: 'درآمد',
    expense: 'هزینه',
    weeklyTrend: 'روند هفتگی',
    recent: 'تراکنش‌های اخیر',
    seeAll: 'مشاهده همه',
    // برچسب‌های کوتاه روزهای هفته، از ابتدا تا انتهای هفته.
    weekdays: 'ش,ی,د,س,چ,پ,ج',
  },
  transactions: {
    title: 'فعالیت',
    empty: {
      title: 'هنوز تراکنشی نیست',
      description: 'تراکنش‌های شما پس از افزودن اینجا نمایش داده می‌شوند.',
    },
  },
  insights: {
    title: 'تحلیل‌ها',
    empty: {
      title: 'هنوز تحلیلی نیست',
      description: 'برای دیدن تحلیل هزینه‌ها چند تراکنش اضافه کنید.',
    },
  },
  profile: {
    title: 'پروفایل',
    openSettings: 'باز کردن تنظیمات',
  },
  settings: {
    title: 'تنظیمات',
    theme: {
      label: 'ظاهر',
      system: 'سیستم',
      light: 'روشن',
      dark: 'تیره',
    },
    direction: {
      label: 'جهت چیدمان',
      system: 'خودکار',
      ltr: 'چپ‌چین',
      rtl: 'راست‌چین',
    },
  },
  addTransaction: {
    title: 'افزودن تراکنش',
    amount: 'مبلغ',
    amountPlaceholder: '۰٫۰۰',
    note: 'یادداشت',
    notePlaceholder: 'این برای چه بود؟',
  },
};
