import React, { Component } from 'react';
import { Result, ResultsComponent } from '@components/Results';
import { ErrorBoundary } from '@components/ErrorBoundary';
import LoaderComponent from '@components/Loader';
import './Main.scss';

interface MainProps {
  results: Result[];
  loading: boolean;
  error: unknown | null;
}

class MainComponent extends Component<MainProps> {
  public render(): React.JSX.Element {
    const { results, loading, error } = this.props;

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
}

export default MainComponent;
