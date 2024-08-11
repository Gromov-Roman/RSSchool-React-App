import Button from '@components/Button/Button';
import { useRouter } from 'next/router';
import styles from './NotFound/NotFoundPage.module.scss';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className={styles['background-img']}>
      <div className={styles.wrapper}>
        <div className={styles['img-wrapper']}>
          <span>44</span>
        </div>
        <p>The page you are trying to search has been</p>
        <p>moved to another universe.</p>
        <Button onClick={() => router.push('/')} testId="to-home-button">
          GET ME HOME
        </Button>
      </div>
    </div>
  );
}
