import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { getResultMock } from '@mocks/result.mock';
import { renderWithProviders } from '@mocks/test-utils';
import MainPage from '@pages/Main/Main.page';
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

  it('clicking on a card opens a detailed card component', async () => {
    renderWithProviders(
      <Provider store={store}>
        <MainPage initialData={{ results: { info: { pages: 10 }, results: [getResultMock(1)] }, detail: null }} />
      </Provider>,
    );

    await screen.findByTestId('result-card');

    fireEvent.click(screen.getByTestId('result-card'));

    expect(mockRouter.query).toEqual({ detail: '1' });
  });
});
