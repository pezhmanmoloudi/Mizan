import { Button, Header, IconButton, Screen, Spacer, TextField } from '@/components';
import { useTranslation } from '@/localization';
import type { RootStackScreenProps } from '@/navigation';

/**
 * Add Transaction modal. UI shell only — the form has no persistence yet. Presented as a
 * modal over the tabs and dismissed via the header close action.
 */
export function AddTransactionScreen({ navigation }: RootStackScreenProps<'AddTransaction'>) {
  const { t } = useTranslation();

  return (
    <Screen>
      <Header
        title={t('addTransaction.title')}
        leading={
          <IconButton
            name="close"
            accessibilityLabel={t('common.cancel')}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <Spacer size="lg" />
      <TextField
        label={t('addTransaction.amount')}
        placeholder={t('addTransaction.amountPlaceholder')}
        keyboardType="decimal-pad"
      />
      <Spacer size="lg" />
      <TextField
        label={t('addTransaction.note')}
        placeholder={t('addTransaction.notePlaceholder')}
      />
      <Spacer size="xl" />
      <Button label={t('common.save')} disabled />
    </Screen>
  );
}
