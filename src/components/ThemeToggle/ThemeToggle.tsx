import { useContext } from 'react';
import { ThemeContext } from '@context/ThemeContext';
import { Theme } from '@enums/Theme.enum';
import './ThemeToggle.scss';

function ThemeToggle() {
  const { theme, toggleThemeHandler } = useContext(ThemeContext);

  return (
    <>
      <input
        checked={theme === Theme.dark}
        onChange={() => toggleThemeHandler()}
        type="checkbox"
        id="themeSwitch"
        className="theme-switch__input custom-checkbox"
      />
      <label htmlFor="themeSwitch" className="theme-switch__label">
        <span />
      </label>
    </>
  );
}

export default ThemeToggle;
