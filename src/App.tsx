import { useState, useEffect, ChangeEvent } from 'react';
import ErrorBoundary from '@components/ErrorBoundary';
import MainComponent from '@components/Main/Main';
import HeaderComponent from '@components/Header/Header';
import { Result } from '@models/result.model';
import { API_URL } from '@constants/api.const';
import './App.scss';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const fetchData = async (query: string = '') => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?search=${query}`);
      const data = await response.json();
      setResults(data.results);
      setLoading(false);
      localStorage.setItem('searchQuery', query);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem('searchQuery') || '';
    setSearchQuery(storedSearchQuery);
    fetchData(storedSearchQuery);
  }, []);

  const handleSearch = () => fetchData(searchQuery.trim());

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
      <HeaderComponent searchQuery={searchQuery} onInputChange={handleInputChange} onSearch={handleSearch} />
      <MainComponent results={results} loading={loading} error={error} />
    </ErrorBoundary>
  );
}

export default App;
