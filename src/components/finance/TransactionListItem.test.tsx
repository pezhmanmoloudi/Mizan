import { fireEvent, renderWithProviders } from '@/test/renderWithProviders';

import { TransactionListItem } from './TransactionListItem';

describe('TransactionListItem', () => {
  it('renders title, subtitle and amount', async () => {
    const { getByText } = await renderWithProviders(
      <TransactionListItem
        title="Green Cafe"
        subtitle="Today · Food"
        amount="-285,000"
        flow="expense"
      />,
    );
    expect(getByText('Green Cafe')).toBeTruthy();
    expect(getByText('-285,000')).toBeTruthy();
  });

  it('fires the overflow action when provided', async () => {
    const onMorePress = jest.fn();
    const { getByLabelText } = await renderWithProviders(
      <TransactionListItem
        title="Salary"
        amount="+18,200,000"
        flow="income"
        onMorePress={onMorePress}
        moreLabel="More"
      />,
    );
    await fireEvent.press(getByLabelText('More'));
    expect(onMorePress).toHaveBeenCalledTimes(1);
  });
});
