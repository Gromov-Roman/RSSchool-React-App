import ResultsComponent from '@components/Results/Results';
import { Outlet, useSearchParams } from 'react-router-dom';
import HeaderComponent from '@components/Header/Header';
import { useContext, useEffect } from 'react';
import useLocalStorage from '@hooks/LocalStorage';
import { ThemeContext } from '@context/ThemeContext';
import { useGetItemsQuery } from '@core/slices/api';
import './Main.page.scss';
import { pagingResultsActions } from '@core/slices/pagingResults';
import { useDispatch } from 'react-redux';

export default function MainPage() {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const [params] = useSearchParams();
  const { getValue: getSearchQuery } = useLocalStorage<string>('searchQuery');
  const page = params.get('page') || null;
  const searchQuery = getSearchQuery();
  const { data: pagingResults, isFetching } = useGetItemsQuery({ page, searchQuery });
  const { setIsFetching, setPagingResults } = pagingResultsActions;

  useEffect(() => {
    dispatch(setIsFetching(isFetching));
    dispatch(setPagingResults(pagingResults));
  }, [pagingResults, isFetching, dispatch]);

  return (
    <>
      <HeaderComponent />

      <article className={`main-page ${theme}`}>
        <ResultsComponent />
        <Outlet />
      </article>
    </>
  );
}
