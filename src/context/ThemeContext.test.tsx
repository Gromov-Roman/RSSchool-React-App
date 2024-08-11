import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ThemeContext, ThemeContextProvider } from './ThemeContext';
import { Theme } from '@enums/Theme.enum';
import { useContext } from 'react';

const TestComponent = () => {
  const { theme, switchThemeHandler, toggleThemeHandler } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => switchThemeHandler(Theme.light)} data-testid="switch-theme">
        Switch Theme
      </button>
      <button onClick={toggleThemeHandler} data-testid="toggle-theme">
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeContextProvider', () => {
  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it('provides the correct default theme', () => {
    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>,
    );
    const theme = screen.getByTestId('theme');
    expect(theme.textContent).toBe(Theme.light);
  });

  it('switchThemeHandler updates the theme correctly', () => {
    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>,
    );
    const theme = screen.getByTestId('theme');
    const switchButton = screen.getByTestId('switch-theme');
    fireEvent.click(switchButton);
    expect(theme.textContent).toBe(Theme.light);
  });

  it('toggleThemeHandler toggles the theme correctly', () => {
    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>,
    );
    const theme = screen.getByTestId('theme');
    const toggleButton = screen.getByTestId('toggle-theme');
    fireEvent.click(toggleButton);
    expect(theme.textContent).toBe(Theme.dark);
    fireEvent.click(toggleButton);
    expect(theme.textContent).toBe(Theme.light);
  });
});
