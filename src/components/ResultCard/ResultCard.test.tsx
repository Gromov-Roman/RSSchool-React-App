import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { getResultMock } from '@mocks/result.mock';
import { PagingResults } from '@models/result.model';
import App from '../../App';
import ResultCardComponent from './ResultCard';

describe('ResultCardComponent', () => {
  it('renders the relevant card data', () => {
    const resultMock = getResultMock();
    render(<ResultCardComponent result={resultMock} />, { wrapper: BrowserRouter });

    expect(screen.getByText(resultMock.name).textContent).toBe('Gaia');
    expect(!!screen.getByTestId('result-card__image')).toBeTruthy;
  });

  it('clicking on a card opens a detailed card component', async () => {
    render(<App />);

    await screen.findByTestId('results');

    fireEvent.click(screen.getAllByTestId('result-card')[0]);

    await screen.findByTestId('detail', {}, { timeout: 3000 });

    expect(!!screen.getByTestId('detail')).toBeTruthy();
  });

  it('clicking triggers an additional API call to fetch detailed information', async () => {
    const resultMock = getResultMock(1);
    const pagingResults: PagingResults = {
      results: [getResultMock(1)],
      info: { pages: 1 },
    };

    let mockResponse = { ok: true, status: 200, json: async () => pagingResults } as Response;
    let fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    render(<App />);

    await screen.findByTestId('results');

    expect(fetchSpy).toHaveBeenCalledTimes(1);

    mockResponse = { ok: true, status: 200, json: async () => resultMock } as Response;
    fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    fireEvent.click(screen.getAllByTestId('result-card')[0]);

    await screen.findByTestId('detail', {}, { timeout: 3000 });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
