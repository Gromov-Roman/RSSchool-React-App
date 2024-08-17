import { lazy } from 'react';

export const MainPage = lazy(() => import('@pages/Main/Main.page'));
export const NotFoundPage = lazy(() => import('@pages/NotFound/NotFound.page'));
export const ResultPage = lazy(() => import('@pages/Result/Result.page'));
export const UncontrolledPage = lazy(() => import('@pages/Uncontrolled/Uncontrolled.page'));
export const ControlledPage = lazy(() => import('@pages/Controlled/Controlled.page'));
