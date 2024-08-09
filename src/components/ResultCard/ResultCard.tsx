import { Result } from '@models/result.model';
import Button from '@components/Button/Button';
import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@core/store';
import { favoritesActions } from '@core/slices/favorites';
import { useRouter } from 'next/router';
import styles from './ResultCard.module.scss';

interface ResultCardProps {
  result: Result;
}

export default function ResultCardComponent({ result }: ResultCardProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toggleFavorite } = favoritesActions;
  const { favorites } = useSelector((state: RootState) => state.favoritesReducer);
  const isFavorite = favorites?.some(({ id }) => id === result.id);

  function handleDetailUpdate() {
    router.query.detail = result.id.toString();
    router.push({ pathname: router.pathname, query: router.query });
  }

  function handleToggleFavorite(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    dispatch(toggleFavorite(result));
  }

  return (
    <Button className={styles['result-card']} onClick={() => handleDetailUpdate()} testId="result-card">
      <div className={styles['result-card__header']}>
        <div className={styles['result-card__name']}>{result.name}</div>
        <div
          className={`${styles['result-card__favorite']} ${isFavorite ? styles['result-card__favorite-active'] : ''}`}
          onClick={(event) => handleToggleFavorite(event)}
          data-testid="result-card__favorite"
        >
          <img alt="favorite" src="poopybutthole.webp" className={styles['result-card__favorite-image']} />
        </div>
      </div>

      <img
        alt={result.name}
        src={result.image}
        className={styles['result-card__image']}
        data-testid="result-card__image"
      />
    </Button>
  );
}
