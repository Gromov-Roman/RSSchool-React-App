import ResultsComponent from '@components/Results/Results';
import HeaderComponent from '@components/Header/Header';
import { useContext, useEffect } from 'react';
import useLocalStorage from '@hooks/LocalStorage';
import { ThemeContext } from '@context/ThemeContext';
import { useGetItemsQuery } from '@core/slices/api';
import { pagingResultsActions } from '@core/slices/pagingResults';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import DetailPage from '@pages/Detail/Detail.page';
import styles from './MainPage.module.scss';

export default function MainPage() {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const mainTheme = `main__${theme}`;
  const mainPageTheme = `main-page__${theme}`;

  const router = useRouter();
  const { getValue: getSearchQuery } = useLocalStorage<string>('searchQuery');
  const page = (router.query.page as string) || null;
  const searchQuery = getSearchQuery();
  const { data: pagingResults, isFetching } = useGetItemsQuery({ page, searchQuery });
  const { setIsFetching, setPagingResults } = pagingResultsActions;

  useEffect(() => {
    dispatch(setIsFetching(isFetching));
    dispatch(setPagingResults(pagingResults));
  }, [pagingResults, isFetching, dispatch]);

  return (
    <main className={`${styles.main} ${mainTheme}`}>
      <HeaderComponent />

      <article className={`${styles['main-page']} ${styles[mainPageTheme]}`}>
        <ResultsComponent />
        {!!router.query.detail && <DetailPage />}
      </article>
    </main>
  );
}
