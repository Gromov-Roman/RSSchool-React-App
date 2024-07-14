import ResultsComponent from '@components/Results/Results';
import { ResultsLoaderData } from '@core/routing/loaders';
import { Outlet, useLoaderData } from 'react-router-dom';
import './Main.page.scss';

export default function MainPage() {
  const { pagingResults } = useLoaderData() as ResultsLoaderData;

  return (
    <main className="main">
      <ResultsComponent pagingResults={pagingResults} />
      <Outlet />
    </main>
  );
}
