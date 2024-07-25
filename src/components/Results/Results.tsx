import ResultCardComponent from '@components/ResultCard/ResultCard';
import PaginationComponent from '@components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import LoaderComponent from '@components/Loader/Loader';
import './Results.scss';
import { useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '@context/ThemeContext';
import { useSelector } from 'react-redux';
import { RootState } from '@core/store';

export default function ResultsComponent() {
  const { pagingResults, isFetching } = useSelector((state: RootState) => state.pagingResultsReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useContext(ThemeContext);

  function handleUpdatePage(page: number) {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  }

  const containerRef = useRef<HTMLDivElement>(null);

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

    containerRef?.current?.addEventListener('click', handleClick);
    return () => containerRef?.current?.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={containerRef} className={`results-container ${theme}`}>
      {!isFetching && !pagingResults?.results?.length && (
        <section className="empty">
          <h2>No results found</h2>
        </section>
      )}

      <section className="results" data-testid="results">
        {isFetching && (
          <section className="empty">
            <LoaderComponent />
          </section>
        )}

        {!isFetching && !!pagingResults?.results?.length && (
          <ul className="results__list">
            {pagingResults.results.map((result) => (
              <li key={result.id} className="results__list-item" data-testid="results__list-item">
                <ResultCardComponent key={result.id} result={result} />
              </li>
            ))}
          </ul>
        )}

        {pagingResults?.info && (
          <footer className="results__footer">
            <PaginationComponent
              disabled={!pagingResults.results}
              length={pagingResults.info.pages}
              page={Number(searchParams.get('page')) || 1}
              onPageChange={(page) => handleUpdatePage(page)}
            />
          </footer>
        )}
      </section>
    </div>
  );
}
