import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from '@components/ErrorBoundary';
import { router } from '@core/routing/router';
import LoaderComponent from '@components/Loader/Loader';
import ThemeContextProvider from '@src/context/ThemeContext';
import './App.scss';

function App() {
  return (
    <ThemeContextProvider>
      <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
        <RouterProvider router={router} fallbackElement={<LoaderComponent />} />
      </ErrorBoundary>
    </ThemeContextProvider>
  );
}

export default App;
