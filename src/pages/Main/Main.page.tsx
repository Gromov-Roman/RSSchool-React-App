import ResultsComponent from '@components/Results/Results';
import { Outlet, useSearchParams } from 'react-router-dom';
import HeaderComponent from '@components/Header/Header';
import { useEffect, useRef, useState } from 'react';
import { PagingResults } from '@models/result.model';
import useLocalStorage from '@hooks/LocalStorage';
import { API_URL } from '@constants/api.const';
import './Main.page.scss';

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagingResults, setPagingResults] = useState<PagingResults | null>(null);
  const [getStoredValue] = useLocalStorage<string>('searchQuery');
  const page = searchParams.get('page') || null;
  const searchQuery = getStoredValue();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (!event.target) {
        return;
      }

      const { tagName } = event.target as Element;
      const { classList } = event.target as Element;

      if (tagName !== 'IMG' && (tagName !== 'BUTTON' || !classList.contains('result-card'))) {
        searchParams.delete('detail');
        setSearchParams(searchParams);
      }
    };

    mainRef?.current?.addEventListener('click', handleClick);
    return () => mainRef?.current?.removeEventListener('click', handleClick);
  }, []);

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

      <main className="main" ref={mainRef}>
        <ResultsComponent pagingResults={pagingResults} />
        <Outlet />
      </main>
    </>
  );
}
