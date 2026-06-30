import { fireEvent, renderWithProviders } from '@/test/renderWithProviders';

import { TextField } from './TextField';

describe('TextField', () => {
  it('renders its label and forwards text changes', async () => {
    const onChangeText = jest.fn();
    const { getByText, getByPlaceholderText } = await renderWithProviders(
      <TextField label="Amount" placeholder="0.00" onChangeText={onChangeText} />,
    );
    expect(getByText('Amount')).toBeTruthy();
    fireEvent.changeText(getByPlaceholderText('0.00'), '42');
    expect(onChangeText).toHaveBeenCalledWith('42');
  });

  it('renders error text when provided', async () => {
    const { getByText } = await renderWithProviders(<TextField label="Amount" error="Required" />);
    expect(getByText('Required')).toBeTruthy();
  });
});
