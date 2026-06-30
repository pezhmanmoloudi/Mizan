import { EmptyFinanceState, Header, Screen } from '@/components';
import { useTranslation } from '@/localization';

/** Placeholder Transactions screen — list/business logic lands in a later milestone. */
export function TransactionsScreen() {
  const { t } = useTranslation();
  return (
    <Screen>
      <Header title={t('transactions.title')} />
      <EmptyFinanceState
        icon="receipt-outline"
        title={t('transactions.empty.title')}
        description={t('transactions.empty.description')}
      />
    </Screen>
  );
}
