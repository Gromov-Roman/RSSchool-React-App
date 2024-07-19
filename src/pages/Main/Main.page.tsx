import ResultsComponent from '@components/Results/Results';
import { Outlet, useSearchParams } from 'react-router-dom';
import HeaderComponent from '@components/Header/Header';
import { useContext, useEffect, useState } from 'react';
import { PagingResults } from '@models/result.model';
import useLocalStorage from '@hooks/LocalStorage';
import { API_URL } from '@constants/api.const';
import { ThemeContext } from '@context/ThemeContext';
import './Main.page.scss';

export default function MainPage() {
  const { theme } = useContext(ThemeContext);
  const [params] = useSearchParams();
  const [pagingResults, setPagingResults] = useState<PagingResults | null>(null);
  const { getValue: getSearchQuery } = useLocalStorage<string>('searchQuery');
  const page = params.get('page') || null;
  const searchQuery = getSearchQuery();

  useEffect(() => {
    setPagingResults((prevPagingResults) => {
      const nextPagingResults = { ...prevPagingResults };
      nextPagingResults.results = null;

      return nextPagingResults as PagingResults;
    });

    const requestUrl = new URL(API_URL);
    const urlParams = new URLSearchParams();

    if (page) {
      urlParams.set('page', page);
    }

    if (searchQuery) {
      urlParams.set('name', searchQuery);
    }

    requestUrl.search = urlParams.toString();

    const fetchData = async () => {
      const response = await fetch(requestUrl);
      const data = await response.json();
      setPagingResults(data);
    };

    fetchData();
  }, [page, searchQuery]);

  return (
    <>
      <HeaderComponent />

      <article className={`main-page ${theme}`}>
        <ResultsComponent pagingResults={pagingResults} />
        <Outlet />
      </article>
    </>
  );
}
