import React, { ChangeEvent, Component } from 'react';
import '@components/Search/Search.scss';

interface SearchProps {
  searchQuery: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export class SearchComponent extends Component<SearchProps> {
  public render(): React.JSX.Element {
    const { searchQuery, onInputChange, onSearch } = this.props;
    return (
      <section className="search">
        <input type="text" value={searchQuery} onChange={onInputChange} placeholder="Enter search query" />
        <button onClick={onSearch}>Search</button>
      </section>
    );
  }
}
