import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { getResultMock } from '@mocks/result.mock';
import App from '../../App';
import ResultCardComponent from './ResultCard';

describe('ResultCardComponent', () => {
  afterEach(cleanup);

  it('renders the relevant card data', () => {
    const resultMock = getResultMock();
    render(<ResultCardComponent result={resultMock} />, { wrapper: BrowserRouter });

    expect(screen.getByText(resultMock.name).textContent).toBe('Gaia');
    expect(!!screen.getByTestId('result-card__image')).toBeTruthy();
  });

  it('clicking on a card opens a detailed card component', async () => {
    render(<App />);

    await screen.findByTestId('result-card');

    fireEvent.click(screen.getByTestId('result-card'));

    await screen.findByTestId('detail');

    expect(!!screen.getByTestId('detail')).toBeTruthy();
  });

  it('clicking triggers an additional API call to fetch detailed information', async () => {
    const resultMock = getResultMock(1);
    const fetchSpy = vi.spyOn(global, 'fetch');

    render(<App />);

    await screen.findByTestId('results');

    expect(fetchSpy).toHaveBeenCalledWith(new URL('https://rickandmortyapi.com/api/character'));

    fireEvent.click(screen.getByTestId('result-card'));

    await screen.findByTestId('detail');

    expect(fetchSpy).toHaveBeenCalledWith(new URL(resultMock.url));
  });
});
