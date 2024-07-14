import ResultsComponent from '@components/Results/Results';
import { Outlet, useSearchParams } from 'react-router-dom';
import './Main.page.scss';
import HeaderComponent from '@components/Header/Header';
import { useEffect, useState } from 'react';
import { PagingResults } from '@models/result.model';
import useLocalStorage from '@hooks/LocalStorage';
import { API_URL } from '@constants/api.const';

export default function MainPage() {
  const [searchParams] = useSearchParams();
  const [pagingResults, setPagingResults] = useState<PagingResults | null>(null);
  const [getStoredValue] = useLocalStorage<string>('searchQuery');
  const page = searchParams.get('page') || null;
  const searchQuery = getStoredValue();

  useEffect(() => {
    setPagingResults(null);

    const requestUrl = new URL(API_URL);
    const params = new URLSearchParams();

    if (page) {
      params.set('page', page);
    }

    if (searchQuery) {
      params.set('name', searchQuery);
    }

    requestUrl.search = params.toString();

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

      <main className="main">
        <ResultsComponent pagingResults={pagingResults} />
        <Outlet />
      </main>
    </>
  );
}
