import {
  AnalyticsChartCard,
  BarChart,
  FinancialSummaryCard,
  Header,
  IconButton,
  ListCard,
  ScrollScreen,
  Section,
  TransactionListItem,
} from '@/components';
import { useTranslation } from '@/localization';

import { useDashboardPreview } from '../hooks/useDashboardPreview';

/**
 * Dashboard screen — the reference composition for a "dashboard" template:
 * `ScrollScreen` + pinned `Header` + a `FinancialSummaryCard` hero followed by titled
 * `Section`s. No business logic here; the view-model comes from a feature hook and every
 * visual is a reusable, tokenized, RTL-aware component.
 */
export function HomeScreen() {
  const { t } = useTranslation();
  const weekdays = t('home.weekdays').split(',');
  const { balance, income, expense, trend, recent } = useDashboardPreview(weekdays);

  return (
    <ScrollScreen
      header={
        <Header
          title={t('home.title')}
          subtitle={t('home.subtitle')}
          trailing={
            <IconButton name="notifications-outline" accessibilityLabel={t('home.title')} />
          }
        />
      }
    >
      <FinancialSummaryCard
        label={t('home.balanceLabel')}
        amount={balance}
        stats={[
          { label: t('home.income'), value: income, icon: 'arrow-down' },
          { label: t('home.expense'), value: expense, icon: 'arrow-up' },
        ]}
      />

      <Section title={t('home.weeklyTrend')}>
        <AnalyticsChartCard title={t('home.weeklyTrend')}>
          <BarChart data={trend} />
        </AnalyticsChartCard>
      </Section>

      <Section title={t('home.recent')} actionLabel={t('home.seeAll')}>
        <ListCard>
          {recent.map((tx) => (
            <TransactionListItem
              key={tx.id}
              title={tx.title}
              subtitle={tx.subtitle}
              amount={tx.amount}
              flow={tx.flow}
              icon={tx.icon}
            />
          ))}
        </ListCard>
      </Section>
    </ScrollScreen>
  );
}
