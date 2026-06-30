import { View } from 'react-native';

import { Button, Header, IconButton, Screen, Spacer, Text } from '@/components';
import { useTranslation } from '@/localization';
import type { ProfileStackScreenProps } from '@/navigation';
import type { ThemePreference } from '@/store';
import { rowDirection, useTheme } from '@/theme';

import { useThemeSettings } from '../hooks/useThemeSettings';

/**
 * Settings screen. Demonstrates the theme system end-to-end: switching the theme preference
 * flips dark/light app-wide and the direction override mirrors the whole layout (RTL).
 */
export function SettingsScreen({ navigation }: ProfileStackScreenProps<'Settings'>) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { themePreference, setThemePreference, rtlOverride, setRtlOverride } = useThemeSettings();

  const themeOptions: { value: ThemePreference; label: string }[] = [
    { value: 'system', label: t('settings.theme.system') },
    { value: 'light', label: t('settings.theme.light') },
    { value: 'dark', label: t('settings.theme.dark') },
  ];

  // Direction values include `null` (follow locale), so options carry a string `key`.
  const directionOptions: { key: string; value: boolean | null; label: string }[] = [
    { key: 'system', value: null, label: t('settings.direction.system') },
    { key: 'ltr', value: false, label: t('settings.direction.ltr') },
    { key: 'rtl', value: true, label: t('settings.direction.rtl') },
  ];

  const row = { flexDirection: rowDirection(theme.direction), gap: theme.spacing.sm } as const;

  return (
    <Screen>
      <Header
        title={t('settings.title')}
        leading={
          <IconButton
            name={theme.isRTL ? 'chevron-forward' : 'chevron-back'}
            accessibilityLabel={t('common.back')}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <Spacer size="lg" />

      <Text variant="heading">{t('settings.theme.label')}</Text>
      <Spacer size="sm" />
      <View style={row}>
        {themeOptions.map((opt) => (
          <Button
            key={opt.value}
            label={opt.label}
            variant={themePreference === opt.value ? 'primary' : 'secondary'}
            onPress={() => setThemePreference(opt.value)}
            style={{ flex: 1 }}
          />
        ))}
      </View>

      <Spacer size="xl" />

      <Text variant="heading">{t('settings.direction.label')}</Text>
      <Spacer size="sm" />
      <View style={row}>
        {directionOptions.map((opt) => (
          <Button
            key={opt.key}
            label={opt.label}
            variant={rtlOverride === opt.value ? 'primary' : 'secondary'}
            onPress={() => setRtlOverride(opt.value)}
            style={{ flex: 1 }}
          />
        ))}
      </View>
    </Screen>
  );
}
