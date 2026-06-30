import { fireEvent, renderWithProviders } from '@/test/renderWithProviders';

import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
  it('renders the title and fires the action', async () => {
    const onActionPress = jest.fn();
    const { getByText } = await renderWithProviders(
      <SectionHeader title="Recent" actionLabel="See all" onActionPress={onActionPress} />,
    );
    expect(getByText('Recent')).toBeTruthy();
    await fireEvent.press(getByText('See all'));
    expect(onActionPress).toHaveBeenCalledTimes(1);
  });
});
