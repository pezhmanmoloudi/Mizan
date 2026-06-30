import { fireEvent, renderWithProviders } from '@/test/renderWithProviders';

import { FAB } from './FAB';

describe('FAB', () => {
  it('calls onPress when tapped', async () => {
    const onPress = jest.fn();
    const { getByRole } = await renderWithProviders(
      <FAB accessibilityLabel="Add transaction" onPress={onPress} />,
    );
    await fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders in RTL without crashing', async () => {
    const { getByLabelText } = await renderWithProviders(
      <FAB accessibilityLabel="افزودن" onPress={() => {}} />,
      { rtl: true },
    );
    expect(getByLabelText('افزودن')).toBeTruthy();
  });
});
