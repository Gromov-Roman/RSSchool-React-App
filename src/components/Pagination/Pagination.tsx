import { useContext, useState } from 'react';
import Button from '@components/Button/Button';
import { generatePages } from '@utils/generate-pages';
import { ThemeContext } from '@context/ThemeContext';
import styles from './Pagination.module.scss';

interface PaginationProps {
  length: number;
  page: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export default function PaginationComponent({ length, page, onPageChange, disabled }: PaginationProps) {
  const [pages, setPages] = useState(generatePages(page, length));
  const [currentPage, setCurrentPage] = useState(page);
  const { theme } = useContext(ThemeContext);
  const paginationTheme = `pagination__${theme}`;

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    setPages(generatePages(p, length));
    onPageChange(p);
  };

  return (
    <nav className={`${styles.pagination} ${disabled ? styles.pagination__disabled : ''} ${styles[paginationTheme]}`}>
      <Button
        className={styles.pagination_button}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <img alt="close" src="left-arrow.svg" width="20px" />
      </Button>
      {pages[0] !== 1 && (
        <>
          <Button onClick={() => handlePageChange(1)} text={String(1)} className={styles.pagination_button} />
          <span className={styles.pagination_delimiter}>...</span>
        </>
      )}
      {pages.map((p) => (
        <Button
          key={p}
          className={
            currentPage === p
              ? `${styles.pagination_button} ${styles.pagination_button__active}`
              : styles.pagination_button
          }
          disabled={currentPage === p}
          onClick={() => handlePageChange(p)}
          text={String(p)}
        />
      ))}
      {pages.at(-1) !== length && (
        <>
          <span className={styles.pagination_delimiter}>...</span>
          <Button onClick={() => handlePageChange(length)} text={String(length)} className="pagination_button" />
        </>
      )}
      <Button
        className={styles.pagination_button}
        disabled={currentPage === length}
        onClick={() => handlePageChange(currentPage + 1)}
        testId="next-page"
      >
        <img alt="close" src="right-arrow.svg" width="20px" />
      </Button>
    </nav>
  );
}
