import { renderWithProviders } from '@/test/renderWithProviders';

import { FinancialSummaryCard } from './FinancialSummaryCard';

describe('FinancialSummaryCard', () => {
  it('renders the label, amount and inline stats', async () => {
    const { getByText } = await renderWithProviders(
      <FinancialSummaryCard
        label="Total balance"
        amount="42,850,000"
        stats={[
          { label: 'Income', value: '18,200,000', icon: 'arrow-down' },
          { label: 'Expense', value: '7,450,000', icon: 'arrow-up' },
        ]}
      />,
    );
    expect(getByText('Total balance')).toBeTruthy();
    expect(getByText('42,850,000')).toBeTruthy();
    expect(getByText('Income')).toBeTruthy();
  });
});
