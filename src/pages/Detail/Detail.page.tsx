import { useContext, useEffect, useState } from 'react';
import LoaderComponent from '@components/Loader/Loader';
import Button from '@components/Button/Button';
import { ThemeContext } from '@context/ThemeContext';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '@core/store';
import styles from './DetailPage.module.scss';

interface DetailBlock {
  title: string;
  text: string;
}

export default function DetailPage() {
  const { theme } = useContext(ThemeContext);
  const detailTheme = `detail__${theme}`;
  const router = useRouter();
  const [detailBlocks, setDetailBlocks] = useState<DetailBlock[]>([]);

  const { detail, isFetching } = useSelector((state: RootState) => state.detailReducer);

  useEffect(() => {
    if (detail) {
      setDetailBlocks([
        { title: 'Status:', text: detail.status },
        { title: 'Gender:', text: detail.gender },
        { title: 'Origin:', text: detail.origin.name },
        { title: 'Location:', text: detail.location.name },
        { title: 'Species:', text: detail.species },
        { title: 'Episodes:', text: detail.episode.length.toString() },
      ]);
    }
  }, [detail]);

  function handleClose() {
    delete router.query.detail;
    router.push({ pathname: router.pathname, query: router.query });
  }

  if (!detail) {
    return null;
  }

  return (
    <section className={`${styles.detail} ${styles[detailTheme]}`} data-testid="detail">
      {isFetching && (
        <section className={styles['empty-detail']}>
          <LoaderComponent />
        </section>
      )}

      {!isFetching && !!detail && (
        <>
          <h3 className={styles.detail_title}>
            <span data-testid="detail__title-text">{detail.name}</span>
            <Button className={styles['close-button']} onClick={() => handleClose()} testId="close-button">
              <img alt="close" src="close.svg" width="20px" />
            </Button>
          </h3>

          <img alt={detail.name} src={detail.image} className={styles.detail_image} data-testid="detail__image" />

          <div className={styles.detail_info}>
            {detailBlocks.map((block) => (
              <div key={block.title} className={styles['detail_info-block']}>
                <h4 className={styles['detail_info-block-title']}>{block.title}</h4>
                <p className={styles['detail_info-block-text']}>{block.text}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
