import './App.scss';

import React, { Component, ChangeEvent } from 'react';
import { ErrorBoundary } from '@components/ErrorBoundary';
import MainComponent from '@components/Main/Main';
import HeaderComponent from '@components/Header/Header';
import { Result } from '@models/result.model';
import { API_URL } from '@constants/api.const';

interface AppState {
  searchQuery: string;
  results: Result[];
  loading: boolean;
  error: unknown | null;
}

class App extends Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchQuery: '',
      results: [],
      loading: false,
      error: null,
    };
  }

  public componentDidMount(): void {
    const searchQuery = localStorage.getItem('searchQuery') || '';
    this.setState({ searchQuery }, () => this.fetchData(searchQuery));
  }

  private fetchData = async (searchQuery: string = ''): Promise<void> => {
    try {
      this.setState({ loading: true });
      const response = await fetch(`${API_URL}?search=${searchQuery}`);
      const data = await response.json();
      this.setState({ results: data.results, loading: false });
      localStorage.setItem('searchQuery', searchQuery);
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  private handleSearch = (): void => {
    const { searchQuery } = this.state;
    this.fetchData(searchQuery.trim());
  };

  private handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: event.target.value });
  };

  public render(): React.JSX.Element {
    const { searchQuery, results, loading, error } = this.state;

    return (
      <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
        <HeaderComponent
          searchQuery={searchQuery}
          onInputChange={this.handleInputChange}
          onSearch={this.handleSearch}
        />
        <MainComponent results={results} loading={loading} error={error} />
      </ErrorBoundary>
    );
  }
}

export default App;
