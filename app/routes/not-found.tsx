import Button from '@components/Button/Button';
import ThemeContextProvider from '@context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <ThemeContextProvider>
      <div className={styles['background-img']}>
        <div className={styles.wrapper}>
          <div className={styles['img-wrapper']}>
            <span>44</span>
          </div>
          <p>The page you are trying to search has been</p>
          <p>moved to another universe.</p>
          <Button onClick={() => navigate('/')} testId="to-home-button">
            GET ME HOME
          </Button>
        </div>
      </div>
    </ThemeContextProvider>
  );
}
