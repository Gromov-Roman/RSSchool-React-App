import ResultsComponent from '@components/Results/Results';
import HeaderComponent from '@components/Header/Header';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '@context/ThemeContext';
import { pagingResultsActions } from '@core/slices/pagingResults';
import { useDispatch } from 'react-redux';
import DetailPage from '@pages/Detail/Detail.page';
import { PagingResults, Result } from '@models/result.model';
import { detailActions } from '@core/slices/detail';
import styles from './MainPage.module.scss';

export interface MainPageProps {
  initialData: { results: PagingResults; detail: Result | null };
  isFetching?: { results: boolean; detail: boolean };
}

export default function MainPage({ initialData, isFetching }: MainPageProps) {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const mainTheme = `main__${theme}`;
  const mainPageTheme = `main-page__${theme}`;

  const { setPagingResults } = pagingResultsActions;
  const { setDetail } = detailActions;

  useEffect(() => {
    dispatch(setPagingResults(initialData.results));
    dispatch(setDetail(initialData.detail));
  }, [initialData, isFetching, dispatch]);

  return (
    <main className={`${styles.main} ${mainTheme}`}>
      <HeaderComponent />

      <article className={`${styles['main-page']} ${styles[mainPageTheme]}`}>
        <ResultsComponent />
        {!!initialData.detail && <DetailPage />}
      </article>
    </main>
  );
}
