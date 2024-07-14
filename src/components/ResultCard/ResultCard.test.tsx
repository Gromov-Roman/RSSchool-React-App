import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { getResultMock } from '@mocks/result.mock';
import { PagingResults } from '@models/result.model';
import App from '../../App';
import ResultCardComponent from './ResultCard';

describe('ResultCardComponent', () => {
  afterEach(() => cleanup());
  beforeEach(() => cleanup());

  it('renders the relevant card data', () => {
    const resultMock = getResultMock();
    render(<ResultCardComponent result={resultMock} />, { wrapper: BrowserRouter });

    expect(screen.getByText(resultMock.name).textContent).toBe('Gaia');
    expect(!!screen.getByTestId('result-card__image')).toBeTruthy;
  });

  it('clicking on a card opens a detailed card component', async () => {
    const resultMock = getResultMock(1);
    const pagingResults: PagingResults = {
      results: [getResultMock(1)],
      info: { pages: 1 },
    };

    let mockResponse = { ok: true, status: 200, json: async () => pagingResults } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    render(<App />);

    await screen.findByTestId('results');

    mockResponse = { ok: true, status: 200, json: async () => resultMock } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    fireEvent.click(screen.getByTestId('result-card'));

    await screen.findByTestId('detail', {}, { timeout: 3000 });

    expect(!!screen.getByTestId('detail')).toBeTruthy();
  });
});
