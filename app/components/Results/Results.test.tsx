import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import MainPage from 'app/pages/Main/Main.page';
import { renderWithProviders } from '@mocks/test-utils';
import { Provider } from 'react-redux';
import { setupStore } from '@core/store';

const store = setupStore();

describe('ResultComponent', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('displays an appropriate message if no cards are present', async () => {
    localStorage.setItem('searchQuery', '"no-items"');

    renderWithProviders(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    await screen.findByText(/No results found/i);

    expect(screen.getByText(/No results found/i)).toBeDefined();
  });
});
