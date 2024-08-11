import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { getResultMock } from '@mocks/result.mock';
import { renderWithProviders } from '@mocks/test-utils';
import MainPage from '@src/app/Main/Main.page';
import { setupStore } from '@core/store';
import { Provider } from 'react-redux';
import mockRouter from 'next-router-mock';
import ResultCardComponent from './ResultCard';

const store = setupStore();

describe('ResultCardComponent', () => {
  afterEach(cleanup);

  it('renders the relevant card data', () => {
    const resultMock = getResultMock();
    renderWithProviders(<ResultCardComponent result={resultMock} />);

    expect(screen.getByText(resultMock.name).textContent).toBe('Gaia');
    expect(screen.getByTestId('result-card__image')).toBeDefined();
  });

  it('clicking triggers an additional API call to fetch detailed information', async () => {
    const resultMock = getResultMock(1);
    const fetchSpy = vi.spyOn(global, 'fetch');

    renderWithProviders(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    await screen.findByTestId('results');

    expect(fetchSpy).toHaveBeenCalledWith(
      new Request(new URL('https://rickandmortyapi.com/api/character'), { signal: AbortSignal.timeout(1) }),
    );

    await screen.findByTestId('result-card');

    fireEvent.click(screen.getByTestId('result-card'));

    await screen.findByTestId('detail');

    expect(fetchSpy).toHaveBeenCalledWith(new Request(new URL(resultMock.url), { signal: AbortSignal.timeout(1) }));
  });

  it('clicking on a card opens a detailed card component', async () => {
    renderWithProviders(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    await screen.findByTestId('result-card');

    fireEvent.click(screen.getByTestId('result-card'));

    expect(mockRouter.query).toEqual({ detail: '1' });
  });
});
