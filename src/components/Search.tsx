import React, { ChangeEvent, Component } from 'react';
import './Search.scss';

interface SearchProps {
  searchTerm: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export class SearchComponent extends Component<SearchProps> {
  public render(): React.JSX.Element {
    const { searchTerm, onInputChange, onSearch } = this.props;
    return (
      <section className="search">
        <input type="text" value={searchTerm} onChange={onInputChange} placeholder="Enter search term" />
        <button onClick={onSearch}>Search</button>
      </section>
    );
  }
}
