import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import MainPage from '@pages/Main/Main.page';
import { pagingResultsMock } from '@mocks/mock-fetch-result';
import { renderWithProviders } from '@mocks/test-utils';

describe('ResultComponent', () => {
  afterEach(cleanup);

  it('renders the specified number of cards', async () => {
    renderWithProviders(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
    );

    await screen.findByTestId('result-card');

    const cards = screen.getAllByTestId('results__list-item');
    expect(cards).toHaveLength(Number(pagingResultsMock.results?.length));
  });

  it('displays an appropriate message if no cards are present', async () => {
    renderWithProviders(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
    );

    localStorage.setItem('searchQuery', '"no-items"');

    await screen.findByText(/No results found/i);

    const message = screen.getByText(/No results found/i);
    expect(!!message).toBeTruthy();
  });
});
