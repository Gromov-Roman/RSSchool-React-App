import { ChangeEvent } from 'react';
import SearchComponent from '@components/Search/Search';
import './Header.scss';
import useLocalStorage from '@hooks/LocalStorage';
import { useSearchParams } from 'react-router-dom';

export default function HeaderComponent() {
  const { value: searchQuery, setValue: setSearchQuery } = useLocalStorage<string>('searchQuery');
  const [params, setParams] = useSearchParams();

  const handleSearch = () => {
    const page = params.get('page');

    if (page === '1') {
      params.delete('page');
    } else {
      params.set('page', '1');
    }

    setParams(params);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value || '';
    setSearchQuery(query);
  };

  return (
    <header className="header">
      <SearchComponent searchQuery={searchQuery || ''} onInputChange={handleInputChange} onSearch={handleSearch} />
    </header>
  );
}
