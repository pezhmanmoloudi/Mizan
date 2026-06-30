import { fireEvent, renderWithProviders } from '@/test/renderWithProviders';

import { EmptyFinanceState } from './EmptyFinanceState';

describe('EmptyFinanceState', () => {
  it('renders title/description and triggers the action', async () => {
    const onAction = jest.fn();
    const { getByText } = await renderWithProviders(
      <EmptyFinanceState
        title="No transactions yet"
        description="Add your first one to get started."
        actionLabel="Add transaction"
        onAction={onAction}
      />,
    );
    expect(getByText('No transactions yet')).toBeTruthy();
    await fireEvent.press(getByText('Add transaction'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
