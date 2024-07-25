import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { getResultMock } from '@mocks/result.mock';
import { renderWithProviders } from '@mocks/test-utils';
import App from '../../App';
import ResultCardComponent from './ResultCard';

describe('ResultCardComponent', () => {
  afterEach(cleanup);

  it('renders the relevant card data', () => {
    const resultMock = getResultMock();
    renderWithProviders(
      <BrowserRouter>
        <ResultCardComponent result={resultMock} />
      </BrowserRouter>,
    );

    expect(screen.getByText(resultMock.name).textContent).toBe('Gaia');
    expect(screen.getByTestId('result-card__image')).toBeDefined();
  });

  it('clicking on a card opens a detailed card component', async () => {
    renderWithProviders(<App />);

    await screen.findByTestId('result-card');

    fireEvent.click(screen.getByTestId('result-card'));

    await screen.findByTestId('detail');

    expect(screen.getByTestId('detail')).toBeDefined();
  });

  it('clicking triggers an additional API call to fetch detailed information', async () => {
    const resultMock = getResultMock(1);
    const fetchSpy = vi.spyOn(global, 'fetch');

    renderWithProviders(<App />);

    await screen.findByTestId('results');

    expect(fetchSpy).toHaveBeenCalledWith(
      new Request(new URL('https://rickandmortyapi.com/api/character'), { signal: AbortSignal.timeout(1) }),
    );

    await screen.findByTestId('result-card');

    fireEvent.click(screen.getByTestId('result-card'));

    await screen.findByTestId('detail');

    expect(fetchSpy).toHaveBeenCalledWith(new Request(new URL(resultMock.url), { signal: AbortSignal.timeout(1) }));
  });
});
