import { renderWithProviders } from '@/test/renderWithProviders';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders its initials', async () => {
    const { getByText } = await renderWithProviders(<Avatar initials="SA" />);
    expect(getByText('SA')).toBeTruthy();
  });
});
