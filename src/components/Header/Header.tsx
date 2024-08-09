import { ChangeEvent, useContext } from 'react';
import SearchComponent from '@components/Search/Search';
import useLocalStorage from '@hooks/LocalStorage';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import { ThemeContext } from '@context/ThemeContext';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';

export default function HeaderComponent() {
  const { theme } = useContext(ThemeContext);
  const headerTheme = `header__${theme}`;
  const { value: searchQuery, setValue: setSearchQuery } = useLocalStorage<string>('searchQuery');
  const router = useRouter();

  const handleSearch = () => {
    const queryParams = new URLSearchParams(router.query as Record<string, string>);
    const page = queryParams.get('page');

    if (page === '1') {
      queryParams.delete('page');
    } else {
      queryParams.set('page', '1');
    }

    router.push({ pathname: router.pathname, query: queryParams.toString() });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value || '';
    setSearchQuery(query);
  };

  return (
    <header className={`${styles.header} ${styles[headerTheme]}`}>
      <ThemeToggle />
      <SearchComponent searchQuery={searchQuery || ''} onInputChange={handleInputChange} onSearch={handleSearch} />
    </header>
  );
}
