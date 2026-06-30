import { renderWithProviders } from '@/test/renderWithProviders';

import { Pill } from './Pill';

describe('Pill', () => {
  it('renders its label', async () => {
    const { getByText } = await renderWithProviders(<Pill label="+12%" tone="error" />);
    expect(getByText('+12%')).toBeTruthy();
  });
});
