import { useContext } from 'react';
import { ThemeContext } from '@context/ThemeContext';
import { Theme } from '@enums/Theme.enum';
import styles from './ThemeToggle.module.scss';

function ThemeToggle() {
  const { theme, toggleThemeHandler } = useContext(ThemeContext);

  return (
    <>
      <input
        checked={theme === Theme.dark}
        onChange={() => toggleThemeHandler()}
        type="checkbox"
        id="themeSwitch"
        className={styles['theme-switch__input']}
      />
      <label htmlFor="themeSwitch" className={styles['theme-switch__label']}>
        <span />
      </label>
    </>
  );
}

export default ThemeToggle;
