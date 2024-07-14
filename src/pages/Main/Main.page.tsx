import ResultsComponent from '@components/Results/Results';
import { ResultsLoaderData } from '@core/routing/loaders';
import { useLoaderData } from 'react-router-dom';
import './Main.page.scss';

export default function MainPage() {
  const { results } = useLoaderData() as ResultsLoaderData;

  return (
    <main className="main">
      <ResultsComponent results={results} />
    </main>
  );
}
