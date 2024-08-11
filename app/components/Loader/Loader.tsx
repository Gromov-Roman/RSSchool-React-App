import styles from './Loader.module.scss';

export default function LoaderComponent() {
  return (
    <div className={styles.loader} data-testid="loader">
      <div className={styles.portal} />
      <div className={styles.rick}>
        <img src="rick.webp" alt="Rick" />
      </div>
    </div>
  );
}
