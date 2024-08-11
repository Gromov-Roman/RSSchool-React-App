import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import DetailPage from '@pages/Detail/Detail.page';
import { Provider } from 'react-redux';
import { renderWithProviders } from '@mocks/test-utils';
import { setupStore } from '@core/store';

const store = setupStore();

describe('DetailPage', () => {
  afterEach(cleanup);

  it('Detail is in document', async () => {
    renderWithProviders(
      <Provider store={store}>
        <DetailPage />
      </Provider>,
    );
    expect(screen.findByTestId('detail')).toBeDefined();
  });
});
