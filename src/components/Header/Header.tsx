import React, { Component, ChangeEvent } from 'react';
import { SearchComponent } from '@components/Search/Search';
import { ErrorButton } from '@components/ErrorButton';
import '@components/Header/Header.scss';

interface HeaderProps {
  searchQuery: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

class HeaderComponent extends Component<HeaderProps> {
  public render(): React.JSX.Element {
    const { searchQuery, onInputChange, onSearch } = this.props;

    return (
      <header className="header">
        <ErrorButton />
        <SearchComponent searchQuery={searchQuery} onInputChange={onInputChange} onSearch={onSearch} />
      </header>
    );
  }
}

export default HeaderComponent;
