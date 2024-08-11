import { ChangeEvent } from 'react';
import Button from '@components/Button/Button';
import styles from './Search.module.scss';

interface SearchProps {
  searchQuery: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export default function SearchComponent({ searchQuery, onInputChange, onSearch }: SearchProps) {
  return (
    <section className={styles.search}>
      <input
        type="text"
        value={searchQuery}
        onChange={onInputChange}
        placeholder="Search..."
        className={styles.search__input}
        data-testid="search-input"
        onKeyDown={({ key }) => {
          if (key === 'Enter') {
            onSearch();
          }
        }}
      />
      <Button className={styles.search__button} onClick={() => onSearch()} text="Search" testId="search-button" />
    </section>
  );
}
