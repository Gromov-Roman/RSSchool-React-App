import { Result } from '@models/result.model';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultCard.scss';
import Button from '@components/Button/Button';

interface ResultCardProps {
  result: Result;
}

export default function ResultCardComponent({ result }: ResultCardProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  function handleDetailUpdate() {
    queryParams.set('detail', String(result.id));
    navigate({ search: `?${queryParams.toString()}` });
  }

  return (
    <Button className="result-card" onClick={() => handleDetailUpdate()} testId="result-card">
      <p className="result-card__name">{result.name}</p>
      <img alt={result.name} src={result.image} className="result-card__image" data-testid="result-card__image" />
    </Button>
  );
}
