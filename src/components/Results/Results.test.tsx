import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import MainPage from '@pages/Main/Main.page';
import { pagingResultsMock } from '@mocks/mock-fetch-result';
import { renderWithProviders } from '@mocks/test-utils';
import { Provider } from 'react-redux';
import { setupStore } from '@core/store';

const store = setupStore();

describe('ResultComponent', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('renders the specified number of cards', async () => {
    renderWithProviders(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    await screen.findByTestId('result-card');

    expect(screen.getAllByTestId('results__list-item')).toHaveLength(Number(pagingResultsMock.results?.length));
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

  it('displays unselect and download buttons', async () => {
    renderWithProviders(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    await screen.findByTestId('result-card');

    fireEvent.click(screen.getByTestId('result-card__favorite'));

    expect(screen.getByTestId('unselect-button')).toBeDefined();
    expect(screen.getByTestId('download-button')).toBeDefined();
  });
});
