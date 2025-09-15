import { createContext } from 'react';

const ThemeContext = createContext({
  toggleTheme: () => {},
  switchToLightTheme: () => {},
  switchToDarkTheme: () => {},
  isThemeDark: false,
  themeName: 'light',
});

export default ThemeContext;
