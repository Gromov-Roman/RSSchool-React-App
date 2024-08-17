import { useContext } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/">
          <Button>Result</Button>
        </Link>
        <Link to="/controlled">
          <Button view="secondary">Controlled Form</Button>
        </Link>
        <Link to="/uncontrolled">
          <Button view="accent">Uncontrolled Form</Button>
        </Link>
      </nav>
    </header>
  );
}
