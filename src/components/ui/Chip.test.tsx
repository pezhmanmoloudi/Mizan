import { fireEvent, renderWithProviders } from '@/test/renderWithProviders';

import { Chip } from './Chip';

describe('Chip', () => {
  it('renders its label and fires onPress', async () => {
    const onPress = jest.fn();
    const { getByText, getByRole } = await renderWithProviders(
      <Chip label="Income" onPress={onPress} />,
    );
    expect(getByText('Income')).toBeTruthy();
    await fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('reflects the selected state', async () => {
    const { getByRole } = await renderWithProviders(
      <Chip label="All" selected onPress={() => {}} />,
    );
    expect(getByRole('button').props.accessibilityState.selected).toBe(true);
  });
});
