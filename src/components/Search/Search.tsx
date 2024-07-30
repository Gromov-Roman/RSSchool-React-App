import { ChangeEvent } from 'react';
import './Search.scss';
import Button from '@components/Button/Button';

interface SearchProps {
  searchQuery: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export default function SearchComponent({ searchQuery, onInputChange, onSearch }: SearchProps) {
  return (
    <section className="search">
      <input
        type="text"
        value={searchQuery}
        onChange={onInputChange}
        placeholder="Search..."
        className="search__input"
        data-testid="search-input"
        onKeyDown={({ key }) => {
          if (key === 'Enter') {
            onSearch();
          }
        }}
      />
      <Button className="search__button" onClick={() => onSearch()} text="Search" testId="search-button" />
    </section>
  );
}
