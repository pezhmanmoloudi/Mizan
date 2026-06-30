import { renderWithProviders } from '@/test/renderWithProviders';

import { IconTile } from './IconTile';

describe('IconTile', () => {
  it('renders in RTL without crashing', async () => {
    const { getByTestId } = await renderWithProviders(
      <IconTile name="home" tone="success" testID="tile" />,
      { rtl: true },
    );
    expect(getByTestId('tile')).toBeTruthy();
  });
});
