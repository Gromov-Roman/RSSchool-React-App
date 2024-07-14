import { createBrowserRouter } from 'react-router-dom';
import { detailLoader } from '@core/routing/loaders';
import { Suspense } from 'react';
import LoaderComponent from '@components/Loader/Loader';
import DetailPage from '@pages/Detail/Detail.page';
import { MainPage, NotFoundPage } from './routing-pages';

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
        loader: detailLoader,
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <DetailPage />
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
