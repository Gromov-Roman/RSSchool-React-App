import { Theme } from '@enums/Theme.enum';
import { createContext, ReactNode, useMemo } from 'react';
import useLocalStorage from '@hooks/LocalStorage';

interface ThemeContextProps {
  theme: Theme;
  switchThemeHandler: (currentTheme: Theme) => void;
  toggleThemeHandler: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.dark,
  switchThemeHandler: () => {},
  toggleThemeHandler: () => {},
});

interface ThemeContextProviderProps {
  children: ReactNode;
}

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const { value: theme, setValue: setTheme } = useLocalStorage<Theme>('_theme', isDark ? Theme.dark : Theme.light);

  const defaultContext: ThemeContextProps = useMemo(
    () => ({
      theme: theme as Theme,
      switchThemeHandler: (currentTheme: Theme) => setTheme(currentTheme),
      toggleThemeHandler: () => setTheme(theme === Theme.dark ? Theme.light : Theme.dark),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={defaultContext}>{children}</ThemeContext.Provider>;
}

export default ThemeContextProvider;
