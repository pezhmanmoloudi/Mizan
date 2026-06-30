import { fireEvent, renderWithProviders } from '@/test/renderWithProviders';

import { Switch } from './Switch';

describe('Switch', () => {
  it('toggles its value on press', async () => {
    const onValueChange = jest.fn();
    const { getByRole } = await renderWithProviders(
      <Switch value={false} onValueChange={onValueChange} accessibilityLabel="Dark mode" />,
    );
    await fireEvent.press(getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });
});
