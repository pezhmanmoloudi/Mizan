import type { BarChartDatum, IconName, TransactionFlow } from '@/components';

export type DashboardTransaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  flow: TransactionFlow;
  icon: IconName;
};

export type DashboardPreview = {
  balance: string;
  income: string;
  expense: string;
  trend: BarChartDatum[];
  recent: DashboardTransaction[];
};

/**
 * Static placeholder view-model for the dashboard. It exists so `HomeScreen` stays purely
 * presentational while real data is not wired yet. When transactions land, swap the body
 * for repository-backed selectors — the screen and component contracts stay unchanged.
 */
export function useDashboardPreview(weekdayLabels: string[]): DashboardPreview {
  const trendValues = [40, 65, 30, 80, 25, 55, 15];

  return {
    balance: '۴۲٬۸۵۰٬۰۰۰',
    income: '۱۸٬۲۰۰٬۰۰۰',
    expense: '۷٬۴۵۰٬۰۰۰',
    trend: trendValues.map((value, index) => ({
      value,
      label: weekdayLabels[index],
      muted: value < 35,
    })),
    recent: [
      {
        id: '1',
        title: 'کافه برگ سبز',
        subtitle: 'امروز · غذا و رستوران',
        amount: '−۲۸۵٬۰۰۰',
        flow: 'expense',
        icon: 'fast-food',
      },
      {
        id: '2',
        title: 'حقوق تیر ماه',
        subtitle: 'دیروز · درآمد',
        amount: '+۱۸٬۲۰۰٬۰۰۰',
        flow: 'income',
        icon: 'briefcase',
      },
      {
        id: '3',
        title: 'اسنپ',
        subtitle: 'دیروز · حمل و نقل',
        amount: '−۹۵٬۰۰۰',
        flow: 'expense',
        icon: 'car',
      },
    ],
  };
}
