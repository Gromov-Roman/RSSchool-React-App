import React, { Component } from 'react';
import './Results.scss';

export interface Result {
  name: string;
  birth_year: string;
}

interface ResultsProps {
  results: Result[];
}

export class ResultsComponent extends Component<ResultsProps> {
  public render(): React.JSX.Element {
    const { results } = this.props;
    return (
      <ul className="results">
        {results.map((result) => (
          <li key={result.name} className="results__item">
            <p className="results__item__name">{result.name}</p>
            <p className="results__item__birth-year">Birth year: {result.birth_year}</p>
          </li>
        ))}
      </ul>
    );
  }
}
