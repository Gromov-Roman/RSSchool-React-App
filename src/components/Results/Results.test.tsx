import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { PagingResults } from '@models/result.model';
import { getResultMock } from '@mocks/result.mock';
import ResultComponent from './Results';

describe('ResultComponent', () => {
  afterEach(() => cleanup());

  it('renders the specified number of cards', () => {
    const pagingResults: PagingResults = {
      results: [getResultMock(), getResultMock(), getResultMock()],
      info: { pages: 1 },
    };

    render(<ResultComponent pagingResults={pagingResults} />, { wrapper: BrowserRouter });

    const cards = screen.getAllByTestId('results__list-item');
    expect(cards).toHaveLength(pagingResults.results.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    const pagingResults: PagingResults = {
      results: [],
      info: { pages: 0 },
    };

    render(<ResultComponent pagingResults={pagingResults} />, { wrapper: BrowserRouter });

    const message = screen.getByText(/No results found/i);
    expect(!!message).toBeTruthy();
  });
});
