import { fireEvent, renderWithProviders } from '@/test/renderWithProviders';

import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('calls onPress when tapped', async () => {
    const onPress = jest.fn();
    const { getByRole } = await renderWithProviders(
      <IconButton name="close" accessibilityLabel="Close" onPress={onPress} />,
    );
    await fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is queryable by its accessibility label', async () => {
    const { getByLabelText } = await renderWithProviders(
      <IconButton name="settings-outline" accessibilityLabel="Settings" onPress={() => {}} />,
    );
    expect(getByLabelText('Settings')).toBeTruthy();
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    const { getByRole } = await renderWithProviders(
      <IconButton name="close" accessibilityLabel="Close" disabled onPress={onPress} />,
    );
    await fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
