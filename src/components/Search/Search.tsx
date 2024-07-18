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
        placeholder="Enter search query"
        className="search__input"
        data-testid="search-input"
        onKeyDown={({ key }) => {
          if (key === 'Enter') {
            onSearch();
          }
        }}
      />
      <Button className="close-button" onClick={() => onSearch()} text="Search" data-testid="search-button" />
    </section>
  );
}
