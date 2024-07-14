import { ChangeEvent, useState } from 'react';
import SearchComponent from '@components/Search/Search';
import './Header.scss';
import useLocalStorage from '@hooks/LocalStorage';
import { useSearchParams } from 'react-router-dom';

export default function HeaderComponent() {
  const [getStoredSearchQuery, setStoredSearchQuery] = useLocalStorage<string>('searchQuery');
  const [searchQuery, setSearchQuery] = useState(getStoredSearchQuery() || '');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    const page = searchParams.get('page');

    if (page) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', '1');
    }
    setSearchParams(searchParams);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value || '';
    setSearchQuery(query);
    setStoredSearchQuery(query);
  };

  return (
    <header className="header">
      <SearchComponent searchQuery={searchQuery} onInputChange={handleInputChange} onSearch={handleSearch} />
    </header>
  );
}
