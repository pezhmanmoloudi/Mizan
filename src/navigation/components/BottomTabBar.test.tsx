import { fireEvent, renderWithProviders } from '@/test/renderWithProviders';

import { BottomTabBar, type BottomTabBarComponentProps } from './BottomTabBar';

const navigate = jest.fn();
const emit = jest.fn(() => ({ defaultPrevented: false }));

function makeProps(): BottomTabBarComponentProps {
  const routes = [
    { key: 'h', name: 'HomeTab' },
    { key: 't', name: 'TransactionsTab' },
    { key: 'i', name: 'InsightsTab' },
    { key: 'p', name: 'ProfileTab' },
  ];
  const descriptors = Object.fromEntries(
    routes.map((r) => [r.key, { options: { title: r.name } }]),
  );
  return {
    state: { index: 0, routes },
    descriptors,
    navigation: { navigate, emit },
    addLabel: 'Add',
  } as unknown as BottomTabBarComponentProps;
}

describe('BottomTabBar', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders every tab label and the Add FAB', async () => {
    const { getByText, getByLabelText } = await renderWithProviders(
      <BottomTabBar {...makeProps()} />,
    );
    expect(getByText('HomeTab')).toBeTruthy();
    expect(getByText('ProfileTab')).toBeTruthy();
    expect(getByLabelText('Add')).toBeTruthy();
  });

  it('navigates to AddTransaction when the FAB is pressed', async () => {
    const { getByLabelText } = await renderWithProviders(<BottomTabBar {...makeProps()} />);
    await fireEvent.press(getByLabelText('Add'));
    expect(navigate).toHaveBeenCalledWith('AddTransaction');
  });

  it('navigates to an unfocused tab on press', async () => {
    const { getByLabelText } = await renderWithProviders(<BottomTabBar {...makeProps()} />);
    await fireEvent.press(getByLabelText('ProfileTab'));
    expect(navigate).toHaveBeenCalledWith('ProfileTab');
  });
});
