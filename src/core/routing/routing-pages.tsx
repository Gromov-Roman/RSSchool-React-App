import { lazy } from 'react';

const MainPage = lazy(() => import('@pages/Main/Main.page'));
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFound.page'));

export { MainPage, NotFoundPage };
