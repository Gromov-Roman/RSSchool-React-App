import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import MainPage from '@src/app/Main/Main.page';
import { renderWithProviders } from '@mocks/test-utils';
import mockRouter from 'next-router-mock';
import PaginationComponent from '@components/Pagination/Pagination';

const handlePageChange = vi.fn();

describe('PaginationComponent', () => {
  afterEach(cleanup);

  it('updates URL query parameter when page changes', async () => {
    renderWithProviders(<MainPage />);

    await screen.findByTestId('result-card');

    fireEvent.click(screen.getByTestId('next-page'));

    expect(mockRouter.query).toEqual({ page: '2' });
  });

  it('renders correct number of pages', async () => {
    render(<PaginationComponent length={5} page={1} />);

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons.length).toBe(6);
  });

  it('disables previous button on first page', async () => {
    render(<PaginationComponent length={10} page={1} />);

    const prevButton = screen.getByTestId('prev-page');
    expect(prevButton.hasAttribute('disabled')).toBeTruthy();
  });

  it('disables next button on last page', async () => {
    render(<PaginationComponent length={10} page={10} />);

    const prevButton = screen.getByTestId('next-page');
    expect(prevButton.hasAttribute('disabled')).toBeTruthy();
  });

  it('updates current page number when is clicked', async () => {
    render(<PaginationComponent length={3} page={1} onPageChange={handlePageChange} />);

    const pageButton = screen.getByText('2');

    fireEvent.click(pageButton);

    expect(pageButton.hasAttribute('disabled')).toBeTruthy();
    expect(handlePageChange).toBeCalledWith(2);
  });

  it('updates current page when first page is clicked', async () => {
    render(<PaginationComponent length={10} page={5} onPageChange={handlePageChange} />);

    const pageButton = screen.getByTestId('first-page');
    fireEvent.click(pageButton);

    expect(handlePageChange).toBeCalledWith(1);
  });

  it('updates current page when last page is clicked', async () => {
    render(<PaginationComponent length={10} page={1} onPageChange={handlePageChange} />);

    const pageButton = screen.getByTestId('last-page');
    fireEvent.click(pageButton);

    expect(handlePageChange).toBeCalledWith(10);
  });

  it('updates current page when next is clicked', async () => {
    render(<PaginationComponent length={3} page={1} onPageChange={handlePageChange} />);

    fireEvent.click(screen.getByTestId('next-page'));

    expect(screen.getByText('2').hasAttribute('disabled')).toBeTruthy();
    expect(handlePageChange).toBeCalledWith(2);
  });

  it('updates current page when prev is clicked', async () => {
    render(<PaginationComponent length={3} page={3} onPageChange={handlePageChange} />);

    fireEvent.click(screen.getByTestId('prev-page'));

    expect(screen.getByText('2').hasAttribute('disabled')).toBeTruthy();
    expect(handlePageChange).toBeCalledWith(2);
  });
});
