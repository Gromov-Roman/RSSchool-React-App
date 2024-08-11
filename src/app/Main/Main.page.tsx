import ResultsComponent from '@components/Results/Results';
import HeaderComponent from '@components/Header/Header';
import { useContext, useEffect, useState } from 'react';
import useLocalStorage from '@hooks/LocalStorage';
import { ThemeContext } from '@context/ThemeContext';
import { useGetItemsQuery } from '@core/slices/api';
import { pagingResultsActions } from '@core/slices/pagingResults';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import DetailPage from '@src/app/Detail/Detail.page';
import styles from './MainPage.module.scss';

export default function MainPage() {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const searchParams = useSearchParams();
  const { getValue: getSearchQuery } = useLocalStorage<string>('searchQuery');
  const page = searchParams?.get('page') || null;
  const searchQuery = getSearchQuery();
  const { data: pagingResults, isFetching } = useGetItemsQuery({ page, searchQuery });
  const { setIsFetching, setPagingResults } = pagingResultsActions;
  const [mainThemeClass, setMainThemeClass] = useState('');
  const [themeClass, setThemeClass] = useState('');

  useEffect(() => {
    setThemeClass(styles[theme]);
    setMainThemeClass(theme);
  }, [theme]);

  useEffect(() => {
    dispatch(setIsFetching(isFetching));
    dispatch(setPagingResults(pagingResults));
  }, [pagingResults, isFetching, dispatch]);

  return (
    <main className={`${styles.main} ${mainThemeClass}`}>
      <HeaderComponent />

      <article className={`${styles['main-page']} ${themeClass}`}>
        <ResultsComponent />
        {!!searchParams?.get('detail') && <DetailPage />}
      </article>
    </main>
  );
}
