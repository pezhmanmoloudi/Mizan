import { renderWithProviders } from '@/test/renderWithProviders';

import { Header } from './Header';
import { IconButton } from './IconButton';

describe('Header', () => {
  it('renders the title and a trailing action', async () => {
    const { getByText, getByLabelText } = await renderWithProviders(
      <Header
        title="Profile"
        trailing={
          <IconButton name="settings-outline" accessibilityLabel="Settings" onPress={() => {}} />
        }
      />,
    );
    expect(getByText('Profile')).toBeTruthy();
    expect(getByLabelText('Settings')).toBeTruthy();
  });

  it('renders in RTL without crashing', async () => {
    const { getByText } = await renderWithProviders(<Header title="پروفایل" />, { rtl: true });
    expect(getByText('پروفایل')).toBeTruthy();
  });
});
