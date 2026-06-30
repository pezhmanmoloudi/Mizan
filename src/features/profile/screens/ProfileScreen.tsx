import { Button, Header, IconButton, Screen, Spacer } from '@/components';
import { useTranslation } from '@/localization';
import type { ProfileStackScreenProps } from '@/navigation';

/** Placeholder Profile screen. Settings is reachable via the header action and a button. */
export function ProfileScreen({ navigation }: ProfileStackScreenProps<'Profile'>) {
  const { t } = useTranslation();
  const openSettings = () => navigation.navigate('Settings');

  return (
    <Screen>
      <Header
        title={t('profile.title')}
        trailing={
          <IconButton
            name="settings-outline"
            accessibilityLabel={t('settings.title')}
            onPress={openSettings}
          />
        }
      />
      <Spacer size="xl" />
      <Button label={t('profile.openSettings')} variant="secondary" onPress={openSettings} />
    </Screen>
  );
}
