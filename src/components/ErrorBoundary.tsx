import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Error caught:', error);
    console.warn('Error stack:', info.componentStack);
  }

  public render(): React.JSX.Element | ReactNode {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    return hasError ? fallback : children;
  }
}
