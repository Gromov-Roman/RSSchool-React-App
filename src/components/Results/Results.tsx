'use client';

import ResultCardComponent from '@components/ResultCard/ResultCard';
import PaginationComponent from '@components/Pagination/Pagination';
import LoaderComponent from '@components/Loader/Loader';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '@context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@core/store';
import Button from '@components/Button/Button';
import { favoritesActions } from '@core/slices/favorites';
import { CSVLink } from 'react-csv';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './Results.module.scss';

interface CsvDataItem {
  id: number;
  name: string;
  image: string;
  status: string;
  gender: string;
  origin: string;
  location: string;
  species: string;
  episodes: string;
}

export default function ResultsComponent() {
  const dispatch = useDispatch();
  const { clearFavorites } = favoritesActions;
  const { favorites } = useSelector((state: RootState) => state.favoritesReducer);
  const { pagingResults, isFetching } = useSelector((state: RootState) => state.pagingResultsReducer);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [csvData, setCsvData] = useState<CsvDataItem[]>([]);
  const { theme } = useContext(ThemeContext);
  const [themeClass, setThemeClass] = useState('');

  useEffect(() => setThemeClass(styles[theme]), [theme]);

  const handleUpdatePage = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (!event.target) {
        return;
      }

      const { tagName } = event.target as Element;
      const { classList } = event.target as Element;

      if (tagName !== 'IMG' && (tagName !== 'BUTTON' || !classList.contains('result-card'))) {
        const params = new URLSearchParams(searchParams?.toString());
        params.delete('detail');
        router.push(`${pathname}?${params.toString()}`);
      }
    };

    containerRef?.current?.addEventListener('click', handleClick);
    return () => containerRef?.current?.removeEventListener('click', handleClick);
  }, []);

  useEffect(
    () =>
      setCsvData(
        favorites.map(({ id, name, image, status, gender, origin, location, species, episode }) => ({
          id,
          name,
          image,
          status,
          gender,
          origin: origin.name,
          location: location.name,
          species,
          episodes: episode.length.toString(),
        })),
      ),
    [favorites],
  );

  const handleUnselectAll = () => dispatch(clearFavorites());

  return (
    <div ref={containerRef} className={`${styles.results} ${themeClass}`}>
      {!isFetching && !pagingResults?.results?.length && (
        <section className={styles.empty}>
          <h2>No results found</h2>
        </section>
      )}

      <section className={styles.results_container} data-testid="results">
        {isFetching && (
          <section className={styles.empty}>
            <LoaderComponent />
          </section>
        )}

        {!isFetching && !!pagingResults?.results?.length && (
          <ul className={styles.results_list}>
            {pagingResults.results.map((result) => (
              <li key={result.id} className={styles['results_list-item']} data-testid="results__list-item">
                <ResultCardComponent key={result.id} result={result} />
              </li>
            ))}
          </ul>
        )}

        {!!pagingResults?.info && (
          <footer className={styles.results_footer}>
            <PaginationComponent
              disabled={!pagingResults.results}
              length={pagingResults.info.pages}
              page={Number(searchParams?.get('page')) || 1}
              onPageChange={(page) => handleUpdatePage(page)}
            />

            {!!favorites.length && (
              <div className={styles.results_actions}>
                <span>Selected&nbsp;{csvData.length}&nbsp;items</span>

                <div className={styles['results_actions-buttons']}>
                  <Button
                    onClick={handleUnselectAll}
                    text="Unselect&nbsp;all"
                    type="secondary"
                    testId="unselect-button"
                  />

                  <CSVLink
                    data={csvData}
                    filename={`${csvData.length}_characters.csv`}
                    className={styles['results_download-button']}
                  >
                    <Button type="accent" text="Download" testId="download-button">
                      Download
                    </Button>
                  </CSVLink>
                </div>
              </div>
            )}
          </footer>
        )}
      </section>
    </div>
  );
}
