import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import { ThemeContext } from '@context/ThemeContext';
import './Header.scss';
import Button from '@components/Button/Button';

export default function HeaderComponent() {
  const { theme } = useContext(ThemeContext);

  return (
    <header className={`header ${theme}`}>
      <ThemeToggle />

      <nav className="navigation">
        <NavLink to="/">
          <Button>Result</Button>
        </NavLink>
        <NavLink to="/uncontrolled">
          <Button view="secondary">Uncontrolled Form</Button>
        </NavLink>
        <NavLink to="/controlled">
          <Button view="accent">Controlled Form</Button>
        </NavLink>
      </nav>
    </header>
  );
}
