import { fireEvent, renderWithProviders } from '@/test/renderWithProviders';

import { ListRow } from './ListRow';

describe('ListRow', () => {
  it('renders title, subtitle and value', async () => {
    const { getByText } = await renderWithProviders(
      <ListRow icon="settings" title="Language" subtitle="App language" value="English" />,
    );
    expect(getByText('Language')).toBeTruthy();
    expect(getByText('App language')).toBeTruthy();
    expect(getByText('English')).toBeTruthy();
  });

  it('is pressable when onPress is provided', async () => {
    const onPress = jest.fn();
    const { getByRole } = await renderWithProviders(
      <ListRow icon="person" title="Edit profile" onPress={onPress} />,
    );
    await fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
