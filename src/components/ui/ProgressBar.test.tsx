import { renderWithProviders } from '@/test/renderWithProviders';

import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('clamps out-of-range progress into its accessibility value', async () => {
    const { getByRole } = await renderWithProviders(<ProgressBar progress={1.5} />);
    expect(getByRole('progressbar').props.accessibilityValue.now).toBe(1);
  });
});
