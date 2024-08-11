import ResultsComponent from '@components/Results/Results';
import { useSearchParams } from '@remix-run/react';
import HeaderComponent from '@components/Header/Header';
import { useContext, useEffect, useState } from 'react';
import useLocalStorage from '@hooks/LocalStorage';
import { ThemeContext } from '@context/ThemeContext';
import { useGetItemsQuery } from '@core/slices/api';
import { pagingResultsActions } from '@core/slices/pagingResults';
import { useDispatch } from 'react-redux';
import DetailPage from '@pages/Detail/Detail.page';
import styles from './MainPage.module.scss';

export default function MainPage() {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const [params] = useSearchParams();
  const { getValue: getSearchQuery } = useLocalStorage<string>('searchQuery');
  const page = params.get('page') || null;
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
        {!!params.get('detail') && <DetailPage />}
      </article>
    </main>
  );
}
