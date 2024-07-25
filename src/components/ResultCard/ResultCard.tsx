import { Result } from '@models/result.model';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@components/Button/Button';
import { MouseEvent } from 'react';
import './ResultCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@core/store';
import { favoritesActions } from '@core/slices/favorites';

interface ResultCardProps {
  result: Result;
}

export default function ResultCardComponent({ result }: ResultCardProps) {
  const dispatch = useDispatch();
  const { toggleFavorite } = favoritesActions;
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { favorites } = useSelector((state: RootState) => state.favoritesReducer);
  const isFavorite = favorites?.some(({ id }) => id === result.id);

  function handleDetailUpdate() {
    queryParams.set('detail', String(result.id));
    navigate({ search: `?${queryParams.toString()}` });
  }

  function handleToggleFavorite(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    dispatch(toggleFavorite(result));
  }

  return (
    <Button className="result-card" onClick={() => handleDetailUpdate()} testId="result-card">
      <div className="result-card__header">
        <div className="result-card__name">{result.name}</div>
        <div
          className={`result-card__favorite ${isFavorite ? 'active' : ''}`}
          onClick={(event) => handleToggleFavorite(event)}
        >
          <img alt="favorite" src="poopybutthole.webp" className="result-card__favorite-image" />
        </div>
      </div>

      <img alt={result.name} src={result.image} className="result-card__image" data-testid="result-card__image" />
    </Button>
  );
}
