import { renderWithProviders } from '@/test/renderWithProviders';

import { StatGroup } from './StatGroup';

describe('StatGroup', () => {
  it('renders each stat value and label', async () => {
    const { getByText } = await renderWithProviders(
      <StatGroup
        stats={[
          { label: 'Transactions', value: '148' },
          { label: 'Categories', value: '7' },
        ]}
      />,
    );
    expect(getByText('148')).toBeTruthy();
    expect(getByText('Categories')).toBeTruthy();
  });
});
