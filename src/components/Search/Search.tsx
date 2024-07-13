import { ChangeEvent } from 'react';
import './Search.scss';

interface SearchProps {
  searchQuery: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export default function SearchComponent({ searchQuery, onInputChange, onSearch }: SearchProps) {
  return (
    <section className="search">
      <input type="text" value={searchQuery} onChange={onInputChange} placeholder="Enter search query" />
      <button onClick={onSearch}>Search</button>
    </section>
  );
}
