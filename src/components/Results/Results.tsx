import '@components/Results/Results.scss';
import { Result } from '@models/result.model';

interface ResultsProps {
  results: Result[];
}

export default function ResultsComponent({ results }: ResultsProps) {
  return (
    <ul className="results">
      {results.map((result) => (
        <li key={result.name} className="results__item">
          <p className="results__item__name">{result.name}</p>
          <p className="results__item__birth-year">Birth year: {result.birth_year}</p>
        </li>
      ))}
    </ul>
  );
}
