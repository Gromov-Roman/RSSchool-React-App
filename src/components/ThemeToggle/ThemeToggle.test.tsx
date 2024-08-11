import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ThemeContext } from '@context/ThemeContext';
import { Theme } from '@enums/Theme.enum';
import ThemeToggle from './ThemeToggle';

const switchThemeHandler = vi.fn();
const toggleThemeHandler = vi.fn();
const getDefaultThemeContext = (theme: Theme = Theme.light) => ({ theme, toggleThemeHandler, switchThemeHandler });

describe('ThemeToggle', () => {
  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it('renders correctly', () => {
    render(
      <ThemeContext.Provider value={getDefaultThemeContext()}>
        <ThemeToggle />
      </ThemeContext.Provider>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDefined();
  });

  it('checkbox is checked when theme is dark', () => {
    render(
      <ThemeContext.Provider value={getDefaultThemeContext(Theme.dark)}>
        <ThemeToggle />
      </ThemeContext.Provider>,
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('calls toggleThemeHandler when checkbox is clicked', () => {
    const context = getDefaultThemeContext();

    render(
      <ThemeContext.Provider value={context}>
        <ThemeToggle />
      </ThemeContext.Provider>,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(toggleThemeHandler).toHaveBeenCalled();
  });
});
