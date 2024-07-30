import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import NotFoundPage from '@pages/NotFound/NotFound.page';
import { BrowserRouter } from 'react-router-dom';

describe('NotFoundPage', () => {
  afterEach(cleanup);

  it('correctly displays the not found page', async () => {
    render(<NotFoundPage />, { wrapper: BrowserRouter });

    expect(screen.getByText(/The page you are trying to search has been/i)).toBeDefined();
    expect(screen.getByText(/moved to another universe./i)).toBeDefined();
    expect(screen.getByTestId('to-home-button')).toBeDefined();
  });

  it('correctly navigate to home', async () => {
    render(<NotFoundPage />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getByTestId('to-home-button'));

    expect(window.location.pathname).toBe('/');
  });
});
