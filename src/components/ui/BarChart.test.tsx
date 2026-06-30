import { renderWithProviders } from '@/test/renderWithProviders';

import { BarChart } from './BarChart';

describe('BarChart', () => {
  it('renders bar labels', async () => {
    const { getByText } = await renderWithProviders(
      <BarChart
        data={[
          { value: 40, label: 'Mon' },
          { value: 80, label: 'Tue', muted: true },
        ]}
      />,
    );
    expect(getByText('Mon')).toBeTruthy();
    expect(getByText('Tue')).toBeTruthy();
  });

  it('handles all-zero data without dividing by zero', async () => {
    const { toJSON } = await renderWithProviders(<BarChart data={[{ value: 0 }, { value: 0 }]} />);
    expect(toJSON()).toBeTruthy();
  });
});
