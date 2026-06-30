import { renderWithProviders } from '@/test/renderWithProviders';

import { ListCard } from './ListCard';
import { Text } from './Text';

describe('ListCard', () => {
  it('renders all provided rows', async () => {
    const { getByText } = await renderWithProviders(
      <ListCard>
        <Text>One</Text>
        <Text>Two</Text>
      </ListCard>,
    );
    expect(getByText('One')).toBeTruthy();
    expect(getByText('Two')).toBeTruthy();
  });

  it('skips falsy children without crashing', async () => {
    const { getByText, queryByText } = await renderWithProviders(
      <ListCard>
        <Text>Visible</Text>
        {false}
        {null}
      </ListCard>,
    );
    expect(getByText('Visible')).toBeTruthy();
    expect(queryByText('false')).toBeNull();
  });
});
