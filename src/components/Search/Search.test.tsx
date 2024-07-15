import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import HeaderComponent from '@components/Header/Header';
import { BrowserRouter } from 'react-router-dom';

const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] ? JSON.parse(store[key]) : null;
    },
    setItem(key: string, value: unknown) {
      store[key] = JSON.stringify(value);
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('SearchComponent', () => {
  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it('saves the entered value to local storage when the search button is clicked', () => {
    render(<HeaderComponent />, { wrapper: BrowserRouter });
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: 'test query' } });
    fireEvent.click(searchButton);

    expect(window.localStorage.getItem('searchQuery')).toBe('"test query"');
  });

  it('retrieves the value from local storage upon mounting', () => {
    window.localStorage.setItem('searchQuery', '"previous query"');
    render(<HeaderComponent />, { wrapper: BrowserRouter });

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    expect(searchInput.value).toBe('previous query');
  });
});
