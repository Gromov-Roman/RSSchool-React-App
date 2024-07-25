import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import MainPage from '@pages/Main/Main.page';
import { pagingResultsMock } from '@mocks/mock-fetch-result';
import { renderWithProviders } from '@mocks/test-utils';

describe('ResultComponent', () => {
  afterEach(() => {
    cleanup();
    localStorage.removeItem('searchQuery');
  });

  it('renders the specified number of cards', async () => {
    renderWithProviders(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
    );

    await screen.findByTestId('result-card');

    expect(screen.getAllByTestId('results__list-item')).toHaveLength(Number(pagingResultsMock.results?.length));
  });

  it('displays an appropriate message if no cards are present', async () => {
    renderWithProviders(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
    );

    localStorage.setItem('searchQuery', '"no-items"');

    await screen.findByText(/No results found/i);

    expect(screen.getByText(/No results found/i)).toBeDefined();
  });

  it('displays unselect and download buttons', async () => {
    renderWithProviders(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
    );

    await screen.findByTestId('result-card');

    fireEvent.click(screen.getByTestId('result-card__favorite'));

    expect(screen.getByTestId('unselect-button')).toBeDefined();
    expect(screen.getByTestId('download-button')).toBeDefined();
  });
});
