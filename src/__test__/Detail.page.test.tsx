import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import { getResultMock } from '@mocks/result.mock';
import { renderWithProviders } from '@mocks/test-utils';
import { Provider } from 'react-redux';
import MainPage from '@pages/Main/Main.page';
import { setupStore } from '@core/store';
import DetailPage from '@pages/Detail/Detail.page';

const resultMock = getResultMock(1);
const store = setupStore();

describe('DetailPage', () => {
  afterEach(cleanup);

  beforeEach(async () => {
    renderWithProviders(
      <Provider store={store}>
        <MainPage
          initialData={{ results: { info: { pages: 10 }, results: [getResultMock()] }, detail: getResultMock(1) }}
        />
      </Provider>,
    );
  });

  it('correctly displays the detailed card data', async () => {
    await screen.findByTestId('detail');

    expect(screen.getByTestId('detail__title-text').textContent).toBe(resultMock.name);
    expect(screen.getByText(resultMock.status)).toBeDefined();
    expect(screen.getByText(resultMock.gender)).toBeDefined();
    expect(screen.getByText(resultMock.origin.name)).toBeDefined();
    expect(screen.getByText(resultMock.location.name)).toBeDefined();
    expect(screen.getByTestId('detail__image').getAttribute('src')).toBe(resultMock.image);
  });

  it('Detail is in document', async () => {
    renderWithProviders(
      <Provider store={store}>
        <DetailPage />
      </Provider>,
    );
    expect(screen.findByTestId('detail')).toBeDefined();
  });
});
