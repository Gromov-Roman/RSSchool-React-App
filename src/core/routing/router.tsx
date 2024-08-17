import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import LoaderComponent from '@components/Loader/Loader';
import { ControlledPage, MainPage, NotFoundPage, ResultPage, UncontrolledPage } from './routing-pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoaderComponent />}>
        <MainPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <ResultPage />
          </Suspense>
        ),
      },
      {
        path: 'uncontrolled',
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <UncontrolledPage />
          </Suspense>
        ),
      },
      {
        path: 'controlled',
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <ControlledPage />
          </Suspense>
        ),
      },
    ],
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
