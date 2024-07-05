import React, { Component } from 'react';

interface ErrorButtonState {
  hasError: boolean;
}

export class ErrorButton extends Component<unknown, ErrorButtonState> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false };
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick() {
    this.setState({ hasError: true });
  }

  public render(): React.JSX.Element {
    const { hasError } = this.state;
    if (hasError) {
      throw new Error('I crashed!');
    }
    return <button onClick={this.handleClick}>Throw Error</button>;
  }
}
