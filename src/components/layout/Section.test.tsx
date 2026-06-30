import { Text } from '@/components/ui';
import { fireEvent, renderWithProviders } from '@/test/renderWithProviders';

import { Section } from './Section';

describe('Section', () => {
  it('renders its title and body', async () => {
    const { getByText } = await renderWithProviders(
      <Section title="Recent">
        <Text>row</Text>
      </Section>,
    );
    expect(getByText('Recent')).toBeTruthy();
    expect(getByText('row')).toBeTruthy();
  });

  it('fires the section action', async () => {
    const onActionPress = jest.fn();
    const { getByText } = await renderWithProviders(
      <Section title="Recent" actionLabel="See all" onActionPress={onActionPress}>
        <Text>row</Text>
      </Section>,
    );
    await fireEvent.press(getByText('See all'));
    expect(onActionPress).toHaveBeenCalledTimes(1);
  });
});
