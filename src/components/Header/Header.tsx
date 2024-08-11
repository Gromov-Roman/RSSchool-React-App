'use client';

import { ChangeEvent, useContext, useEffect, useState } from 'react';
import SearchComponent from '@components/Search/Search';
import useLocalStorage from '@hooks/LocalStorage';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import { ThemeContext } from '@context/ThemeContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './Header.module.scss';

export default function HeaderComponent() {
  const { theme } = useContext(ThemeContext);
  const { value: searchQuery, setValue: setSearchQuery } = useLocalStorage<string>('searchQuery');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [themeClass, setThemeClass] = useState('');

  useEffect(() => setThemeClass(styles[theme]), [theme]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams?.toString());

    if (params.get('page')) {
      params.delete('page');
    } else {
      params.set('page', '1');
    }

    router.push(`${pathname}?${params.toString()}`);
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
