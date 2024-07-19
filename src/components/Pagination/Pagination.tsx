import { useState } from 'react';
import Button from '@components/Button/Button';
import { generatePages } from '@utils/generate-pages';
import './Pagination.scss';

interface PaginationProps {
  length: number;
  page: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export default function PaginationComponent({ length, page, onPageChange, disabled }: PaginationProps) {
  const [pages, setPages] = useState(generatePages(page, length));
  const [currentPage, setCurrentPage] = useState(page);

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    setPages(generatePages(p, length));
    onPageChange(p);
  };

  return (
    <nav className={`pagination ${disabled ? 'disabled' : ''}`}>
      <Button
        className="pagination__button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <img alt="close" src="left-arrow.svg" width="20px" />
      </Button>
      {pages[0] !== 1 && (
        <>
          <Button onClick={() => handlePageChange(1)} text={String(1)} className="pagination__button" />
          <span>...</span>
        </>
      )}
      {pages.map((p) => (
        <Button
          key={p}
          className={currentPage === p ? 'pagination__button active' : 'pagination__button'}
          disabled={currentPage === p}
          onClick={() => handlePageChange(p)}
          text={String(p)}
        />
      ))}
      {pages.at(-1) !== length && (
        <>
          <span>...</span>
          <Button onClick={() => handlePageChange(length)} text={String(length)} className="pagination__button" />
        </>
      )}
      <Button
        className="pagination__button"
        disabled={currentPage === length}
        onClick={() => handlePageChange(currentPage + 1)}
        testId="next-page"
      >
        <img alt="close" src="right-arrow.svg" width="20px" />
      </Button>
    </nav>
  );
}
