import { Theme } from '@enums/Theme.enum';
import { createContext, ReactNode, useMemo } from 'react';
import useLocalStorage from '@hooks/LocalStorage';

interface ThemeContextProps {
  theme: Theme;
  themeSwitchHandler: (currentTheme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.dark,
  themeSwitchHandler: () => {},
});

interface ThemeContextProviderProps {
  children: ReactNode;
}

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const { value: theme, setValue: setTheme } = useLocalStorage<Theme>('_theme', Theme.dark);
  const themeSwitchHandler = (currentTheme: Theme) => setTheme(currentTheme);
  const defaultContext: ThemeContextProps = useMemo(() => ({ theme: theme as Theme, themeSwitchHandler }), []);

  return <ThemeContext.Provider value={defaultContext}>{children}</ThemeContext.Provider>;
}

export default ThemeContextProvider;
