import { Result } from '@models/result.model';
import './Results.scss';

interface ResultsProps {
  results: Result[];
}

export default function ResultsComponent({ results }: ResultsProps) {
  return (
    <ul className="results">
      {results.map((result) => (
        <li key={result.id} className="results__item">
          <p className="results__item__name">{result.name}</p>
          <p className="results__item__birth-year">Status: {result.status}</p>
        </li>
      ))}
    </ul>
  );
}
