import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PagingResults } from '@models/result.model';
import { getResultMock } from '@mocks/result.mock';
import ResultComponent from '@components/Results/Results';

describe('PaginationComponent', () => {
  afterEach(cleanup);

  it('updates URL query parameter when page changes', async () => {
    const pagingResults: PagingResults = {
      results: [getResultMock(), getResultMock(), getResultMock()],
      info: { pages: 10 },
    };

    render(<ResultComponent pagingResults={pagingResults} />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getByTestId('next-page'));

    expect(location.search).toBe('?page=2');
  });
});
