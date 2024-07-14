import { ChangeEvent, useEffect, useState } from 'react';
import SearchComponent from '@components/Search/Search';
import './Header.scss';

export default function HeaderComponent() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem('searchQuery') || '';
    setSearchQuery(storedSearchQuery);
  }, []);

  const handleSearch = () => {};

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <header className="header">
      <SearchComponent searchQuery={searchQuery} onInputChange={handleInputChange} onSearch={handleSearch} />
    </header>
  );
}
