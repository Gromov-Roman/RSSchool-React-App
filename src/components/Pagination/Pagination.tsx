import './Pagination.scss';
import { useState } from 'react';

const PAGINATION_OFFSET = 1;
const PAGINATION_LIMIT = 2;

interface PaginationProps {
  length: number;
  page: number;
  onPageChange: (page: number) => void;
}

const generatePages = (page: number, length: number) => {
  const pages = [];

  let startPage = Math.max(1, page - PAGINATION_OFFSET);
  let endPage = Math.min(length, page + PAGINATION_OFFSET);

  if (endPage - startPage < PAGINATION_LIMIT) {
    if (startPage === 1) {
      endPage = Math.min(length, startPage + PAGINATION_LIMIT);
    } else if (endPage === length) {
      startPage = Math.max(1, endPage - PAGINATION_LIMIT);
    }
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  return pages;
};

export default function PaginationComponent({ length, page, onPageChange }: PaginationProps) {
  const [pages, setPages] = useState(generatePages(page, length));
  const [currentPage, setCurrentPage] = useState(page);

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    setPages(generatePages(p, length));
    onPageChange(p);
  };

  return (
    <nav className="pagination">
      <button
        className="pagination__button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        ⬅️
      </button>
      {pages[0] !== 1 && (
        <>
          <button onClick={() => handlePageChange(1)}>{1}</button>
          <span>...</span>
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          className={currentPage === p ? 'pagination__page-button active' : 'pagination__page-button'}
          onClick={() => handlePageChange(p)}
        >
          {p}
        </button>
      ))}
      {pages.at(-1) !== length && (
        <>
          <span>...</span>
          <button onClick={() => handlePageChange(length)}>{length}</button>
        </>
      )}
      <button
        className="pagination__button"
        disabled={currentPage === length}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        ➡️
      </button>
    </nav>
  );
}
