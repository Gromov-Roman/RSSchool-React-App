import './App.scss';

import React, { Component, ChangeEvent } from 'react';
import { Result } from '@components/Results';
import { ErrorBoundary } from '@components/ErrorBoundary';
import MainComponent from '@components/Main';
import HeaderComponent from '@components/Header';

const API_URL = 'https://swapi.dev/api/people';

interface AppState {
  searchTerm: string;
  results: Result[];
  loading: boolean;
  error: unknown | null;
}

class App extends Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      loading: false,
      error: null,
    };
  }

  public componentDidMount(): void {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm }, () => this.fetchData(searchTerm));
  }

  private fetchData = async (searchTerm: string = ''): Promise<void> => {
    try {
      this.setState({ loading: true });
      const response = await fetch(`${API_URL}?search=${searchTerm}`);
      const data = await response.json();
      this.setState({ results: data.results, loading: false });
      localStorage.setItem('searchTerm', searchTerm);
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  private handleSearch = (): void => {
    const { searchTerm } = this.state;
    this.fetchData(searchTerm.trim());
  };

  private handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: event.target.value });
  };

  public render(): React.JSX.Element {
    const { searchTerm, results, loading, error } = this.state;

    return (
      <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
        <HeaderComponent searchTerm={searchTerm} onInputChange={this.handleInputChange} onSearch={this.handleSearch} />
        <MainComponent results={results} loading={loading} error={error} />
      </ErrorBoundary>
    );
  }
}

export default App;
