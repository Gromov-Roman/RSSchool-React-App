import { Result } from '@models/result.model';
import ErrorBoundary from '@components/ErrorBoundary';
import LoaderComponent from '@components/Loader/Loader';
import ResultsComponent from '@components/Results/Results';
import './Main.scss';

interface MainProps {
  results: Result[];
  loading: boolean;
  error: unknown | null;
}

export default function MainComponent({ results, loading, error }: MainProps) {
  return (
    <main className="main">
      <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
        {!!error && <div>Error: {String(error)}</div>}
        {loading && <LoaderComponent />}
        {!error && !loading && <ResultsComponent results={results} />}
      </ErrorBoundary>
    </main>
  );
}
