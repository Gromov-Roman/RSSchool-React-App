'use client';

import Button from '@components/Button/Button';
import { useRouter } from 'next/navigation';
import styles from '@pages/NotFound/NotFoundPage.module.scss';
import ThemeContextProvider from '@context/ThemeContext';

export default function NotFoundCatchAll() {
  const router = useRouter();

  return (
    <ThemeContextProvider>
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
    </ThemeContextProvider>
  );
}
