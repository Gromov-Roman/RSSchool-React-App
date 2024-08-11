import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders error message when a child component throws an error', () => {
    render(
      <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
        <ProblematicComponent />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/something went wrong/i)).toBeDefined();
  });

  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
        <div>Child component</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText(/child component/i)).toBeDefined();
  });
});
