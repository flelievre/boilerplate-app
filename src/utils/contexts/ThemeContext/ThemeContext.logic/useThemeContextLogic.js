import {
  useMemo,
} from 'react';
import createPersistedState from 'use-persisted-state';
import {
  responsiveFontSizes,
  createTheme,
} from '@mui/material/styles';
import createCommonComponentsTheme from '../ThemeContext.functions/createCommonComponentsTheme';
import {
  themesByNames,
} from '@/themes';

const useThemeState = createPersistedState('theme');

const useThemeContextLogic = () => {
  const initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  const [themeName, setThemeName] = useThemeState(initialTheme);

  const theme = useMemo(() => {
    const baseTheme = createTheme({
      ...themesByNames[themeName],
    });
  
    const withComponents = createTheme(
      baseTheme,
      {
        components: {
          ...createCommonComponentsTheme(baseTheme).components,
        },
      }
    );
  
    return responsiveFontSizes(withComponents);
  }, [themeName]);

  const toggleTheme = () => {
    if (themeName === 'dark') {
      setThemeName('light');
    } else {
      setThemeName('dark');
    }
  };

  const switchToLightTheme = () => {
    setThemeName('light');
  };

  const switchToDarkTheme = () => {
    setThemeName('dark');
  };

  const isThemeDark = (themeName === 'dark');

  return {
    theme,
    themeName,
    toggleTheme,
    switchToLightTheme,
    switchToDarkTheme,
    isThemeDark,
  };
};

export default useThemeContextLogic;
