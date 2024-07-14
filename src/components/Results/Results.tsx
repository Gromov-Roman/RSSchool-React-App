import { PagingResults } from '@models/result.model';
import ResultCardComponent from '@components/ResultCard/ResultCard';
import './Results.scss';
import PaginationComponent from '@components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

interface ResultsProps {
  pagingResults: PagingResults;
}

export default function ResultsComponent({ pagingResults }: ResultsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleUpdatePage(page: number) {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  }

  return (
    <div className="results">
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
    </div>
  );
}
