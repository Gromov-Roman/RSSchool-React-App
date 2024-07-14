import ErrorBoundary from '@components/ErrorBoundary';
import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from '@core/routing/router';
import LoaderComponent from '@components/Loader/Loader';

function App() {
  return (
    <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
      <RouterProvider router={router} fallbackElement={<LoaderComponent />} />
    </ErrorBoundary>
  );
}

export default App;
