import { fireEvent, renderWithProviders } from '@/test/renderWithProviders';

import { Button } from './Button';

describe('Button', () => {
  it('renders its label', async () => {
    const { getByText } = await renderWithProviders(<Button label="Save" onPress={() => {}} />);
    expect(getByText('Save')).toBeTruthy();
  });

  it('calls onPress when tapped', async () => {
    const onPress = jest.fn();
    const { getByRole } = await renderWithProviders(<Button label="Save" onPress={onPress} />);
    await fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress while loading', async () => {
    const onPress = jest.fn();
    const { getByRole } = await renderWithProviders(
      <Button label="Save" loading onPress={onPress} />,
    );
    await fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
