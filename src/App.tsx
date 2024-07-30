import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from '@components/ErrorBoundary';
import { router } from '@core/routing/router';
import LoaderComponent from '@components/Loader/Loader';
import { ThemeContext } from '@context/ThemeContext';
import { useContext } from 'react';
import './App.scss';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
      <main className={`main ${theme}`}>
        <RouterProvider router={router} fallbackElement={<LoaderComponent />} />
      </main>
    </ErrorBoundary>
  );
}

export default App;
