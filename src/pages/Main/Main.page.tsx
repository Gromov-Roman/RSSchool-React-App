import { Outlet } from 'react-router-dom';
import HeaderComponent from '@components/Header/Header';
import { useContext } from 'react';
import { ThemeContext } from '@context/ThemeContext';
import './Main.page.scss';

export default function MainPage() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <HeaderComponent />

      <article className={`main-page ${theme}`}>
        <Outlet />
      </article>
    </>
  );
}
