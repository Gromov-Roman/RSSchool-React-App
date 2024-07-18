import ErrorBoundary from '@components/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { router } from '@core/routing/router';
import LoaderComponent from '@components/Loader/Loader';
import { createContext } from 'react';
import { Theme } from '@enums/Theme.enum';
import './App.scss';

const defaultTheme = Theme.dark;
export const ThemeContext = createContext(defaultTheme);

function App() {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
        <RouterProvider router={router} fallbackElement={<LoaderComponent />} />
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
}

export default App;
