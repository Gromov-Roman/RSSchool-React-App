import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SearchComponent from './Search';
import HeaderComponent from '@components/Header/Header';

const onInputChange = vi.fn();
const onSearch = vi.fn();

describe('SearchComponent', () => {
  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it('saves the entered value to local storage when the search button is clicked', () => {
    render(<HeaderComponent />);
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: 'test query' } });
    fireEvent.click(searchButton);

    expect(window.localStorage.getItem('searchQuery')).toBe('"test query"');
  });

  it('retrieves the value from local storage upon mounting', () => {
    window.localStorage.setItem('searchQuery', '"previous query"');
    render(<SearchComponent searchQuery="previous query" onInputChange={onInputChange} onSearch={onSearch} />);

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    expect(searchInput.value).toBe('previous query');
  });

  it('calls onInputChange when the input value changes', () => {
    render(<SearchComponent searchQuery="" onInputChange={onInputChange} onSearch={onSearch} />);
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 'new query' } });
    expect(onInputChange).toHaveBeenCalled();
  });

  it('calls onSearch when the Enter key is pressed', () => {
    render(<SearchComponent searchQuery="" onInputChange={onInputChange} onSearch={onSearch} />);
    const searchInput = screen.getByTestId('search-input');

    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(onSearch).toHaveBeenCalled();
  });

  it('calls onSearch when the search button is clicked', () => {
    render(<SearchComponent searchQuery="" onInputChange={onInputChange} onSearch={onSearch} />);
    const searchButton = screen.getByTestId('search-button');

    fireEvent.click(searchButton);
    expect(onSearch).toHaveBeenCalled();
  });
});
