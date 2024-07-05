import React, { Component, ChangeEvent } from 'react';
import { SearchComponent } from '@components/Search';
import { ErrorButton } from '@components/ErrorButton';
import './Header.scss';

interface HeaderProps {
  searchTerm: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

class HeaderComponent extends Component<HeaderProps> {
  public render(): React.JSX.Element {
    const { searchTerm, onInputChange, onSearch } = this.props;

    return (
      <header className="header">
        <ErrorButton />
        <SearchComponent searchTerm={searchTerm} onInputChange={onInputChange} onSearch={onSearch} />
      </header>
    );
  }
}

export default HeaderComponent;
