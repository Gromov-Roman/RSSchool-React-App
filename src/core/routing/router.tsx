import { createBrowserRouter } from 'react-router-dom';
import { resultsLoader } from '@core/routing/loaders';
import { Suspense } from 'react';
import LoaderComponent from '@components/Loader/Loader';
import { MainPage, NotFoundPage } from './routing-pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoaderComponent />}>
        <MainPage />
      </Suspense>
    ),
    loader: resultsLoader,
    children: [],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoaderComponent />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: '/404',
    element: (
      <Suspense fallback={<LoaderComponent />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
