import ResultCardComponent from '@components/ResultCard/ResultCard';
import PaginationComponent from '@components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { PagingResults } from '@models/result.model';
import LoaderComponent from '@components/Loader/Loader';
import './Results.scss';

interface ResultsProps {
  pagingResults: PagingResults | null;
}

export default function ResultsComponent({ pagingResults }: ResultsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleUpdatePage(page: number) {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  }

  return (
    <>
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
        <section className="results">
          <ul className="results__list">
            {pagingResults.results.map((result) => (
              <li key={result.id} className="results__list-item">
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
    </>
  );
}
