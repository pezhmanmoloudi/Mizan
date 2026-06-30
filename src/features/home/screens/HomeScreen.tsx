import { AsyncBoundary, Screen, Spacer, Text } from '@/components';
import { useTranslation } from '@/localization';

import { OverviewCard } from '../components/OverviewCard';
import { useHomeOverview } from '../hooks/useHomeOverview';

/**
 * Presentational screen. No business logic here — it composes the feature hook and UI
 * primitives only. This is the reference for "no inline business logic inside screens".
 */
export function HomeScreen() {
  const { t } = useTranslation();
  const { categoryCount, status, error, refresh } = useHomeOverview();

  return (
    <Screen>
      <Text variant="title">{t('home.title')}</Text>
      <Spacer size="xs" />
      <Text variant="body" color="textMuted">
        {t('home.subtitle')}
      </Text>
      <Spacer size="xl" />
      <AsyncBoundary status={status} error={error} onRetry={refresh}>
        <OverviewCard label="Categories" value={String(categoryCount)} />
      </AsyncBoundary>
    </Screen>
  );
}
