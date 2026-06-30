import { renderWithProviders } from '@/test/renderWithProviders';

import { Divider } from './Divider';

describe('Divider', () => {
  it('renders', async () => {
    const { getByTestId } = await renderWithProviders(<Divider testID="divider" />);
    expect(getByTestId('divider')).toBeTruthy();
  });
});
