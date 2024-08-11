import { ChangeEvent, useContext, useEffect, useState } from 'react';
import SearchComponent from '@components/Search/Search';
import useLocalStorage from '@hooks/LocalStorage';
import { useSearchParams } from '@remix-run/react';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import { ThemeContext } from '@context/ThemeContext';
import styles from './Header.module.scss';

export default function HeaderComponent() {
  const { theme } = useContext(ThemeContext);
  const { value: searchQuery, setValue: setSearchQuery } = useLocalStorage<string>('searchQuery');
  const [params, setParams] = useSearchParams();
  const [themeClass, setThemeClass] = useState('');

  useEffect(() => setThemeClass(styles[theme]), [theme]);

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
    <header className={`${styles.header} ${themeClass}`}>
      <ThemeToggle />
      <SearchComponent searchQuery={searchQuery || ''} onInputChange={handleInputChange} onSearch={handleSearch} />
    </header>
  );
}
