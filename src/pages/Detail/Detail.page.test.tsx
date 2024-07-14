import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { getResultMock } from '@mocks/result.mock';
import { PagingResults } from '@models/result.model';
import App from '../../App';

describe('DetailPage', () => {
  afterEach(() => cleanup());
  beforeEach(() => cleanup());

  it('displays a loading indicator while fetching data', async () => {
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

    expect(!!screen.getByTestId('loader')).toBeTruthy();
  });

  it('correctly displays the detailed card data', async () => {
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

    expect(screen.getByTestId('detail__title-text').textContent).toBe(resultMock.name);
    expect(!!screen.getByText(resultMock.status)).toBeTruthy();
    expect(!!screen.getByText(resultMock.gender)).toBeTruthy();
    expect(!!screen.getByText(resultMock.origin.name)).toBeTruthy();
    expect(!!screen.getByText(resultMock.location.name)).toBeTruthy();
    expect(screen.getByTestId('detail__image').getAttribute('src')).toBe(resultMock.image);
  });

  it('hides the component when the close button is clicked', async () => {
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

    fireEvent.click(screen.getByText('❌'));

    expect(!!screen.queryByTestId('detail')).toBeFalsy;
  });
});
