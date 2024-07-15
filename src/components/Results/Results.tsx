import ResultCardComponent from '@components/ResultCard/ResultCard';
import PaginationComponent from '@components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { PagingResults } from '@models/result.model';
import LoaderComponent from '@components/Loader/Loader';
import './Results.scss';
import { useEffect, useRef } from 'react';

interface ResultsProps {
  pagingResults: PagingResults | null;
}

export default function ResultsComponent({ pagingResults }: ResultsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

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
    <div ref={containerRef} className="results-container">
      {!pagingResults && (
        <section className="empty">
          <LoaderComponent />
        </section>
      )}

      {!!pagingResults && !pagingResults?.results?.length && (
        <section className="empty">
          <h2>No results found</h2>
        </section>
      )}

      {!!pagingResults?.results?.length && (
        <section className="results" data-testid="results">
          <ul className="results__list">
            {pagingResults.results.map((result) => (
              <li key={result.id} className="results__list-item" data-testid="results__list-item">
                <ResultCardComponent key={result.id} result={result} />
              </li>
            ))}
          </ul>
          <PaginationComponent
            length={pagingResults.info.pages}
            page={Number(searchParams.get('page')) || 1}
            onPageChange={(page) => handleUpdatePage(page)}
          />
        </section>
      )}
    </div>
  );
}
