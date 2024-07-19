import { ChangeEvent, useContext } from 'react';
import SearchComponent from '@components/Search/Search';
import './Header.scss';
import useLocalStorage from '@hooks/LocalStorage';
import { useSearchParams } from 'react-router-dom';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import { ThemeContext } from '@context/ThemeContext';

export default function HeaderComponent() {
  const { theme } = useContext(ThemeContext);
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
    <header className={`header ${theme}`}>
      <ThemeToggle />
      <SearchComponent searchQuery={searchQuery || ''} onInputChange={handleInputChange} onSearch={handleSearch} />
    </header>
  );
}
