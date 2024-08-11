import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import ThemeContextProvider from '@context/ThemeContext';
import HeaderComponent from './Header';
import { localStorageMock } from '@mocks/local-storage.mock';

describe('HeaderComponent', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    render(<HeaderComponent />, { wrapper: ThemeContextProvider });
    expect(screen.getByRole('banner')).toBeDefined();
  });

  it('calls setSearchQuery on input change', () => {
    render(<HeaderComponent />, { wrapper: ThemeContextProvider });
    const setItemSpy = vi.spyOn(localStorageMock, 'setItem');

    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'test' } });
    expect(setItemSpy).toHaveBeenCalledWith('searchQuery', '"test"');
  });
});
