import { ChangeEvent } from 'react';
import SearchComponent from '@components/Search/Search';
import './Header.scss';

interface HeaderProps {
  searchQuery: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export default function HeaderComponent({ searchQuery, onInputChange, onSearch }: HeaderProps) {
  return (
    <header className="header">
      <SearchComponent searchQuery={searchQuery} onInputChange={onInputChange} onSearch={onSearch} />
    </header>
  );
}
