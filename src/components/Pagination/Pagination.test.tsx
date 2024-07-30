import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import MainPage from '@pages/Main/Main.page';
import { renderWithProviders } from '@mocks/test-utils';
import { BrowserRouter } from 'react-router-dom';

describe('PaginationComponent', () => {
  afterEach(cleanup);

  it('updates URL query parameter when page changes', async () => {
    renderWithProviders(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
    );

    await screen.findByTestId('result-card');

    fireEvent.click(screen.getByTestId('next-page'));

    expect(document.location.search).toBe('?page=2');
  });
});
