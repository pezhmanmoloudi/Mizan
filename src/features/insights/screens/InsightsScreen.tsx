import { EmptyState, Header, Screen } from '@/components';
import { useTranslation } from '@/localization';

/** Placeholder Insights screen — charts/analytics land in a later milestone. */
export function InsightsScreen() {
  const { t } = useTranslation();
  return (
    <Screen>
      <Header title={t('insights.title')} />
      <EmptyState title={t('insights.empty.title')} description={t('insights.empty.description')} />
    </Screen>
  );
}
