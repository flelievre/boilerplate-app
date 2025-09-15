import React, {
  useMemo,
} from 'react';
import {
  CssBaseline
} from '@mui/material';
import {
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import ThemeContext from './ThemeContext';
import useThemeContextLogic from './ThemeContext.logic/useThemeContextLogic';

const ThemeProvider = ({ children }) => {
  const {
    theme,
    ...valuesToProvide
  } = useThemeContextLogic();

  return useMemo(() => (
    <ThemeContext.Provider
      value={{
        ...valuesToProvide,
        theme,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  ), [
    JSON.stringify({
      ...valuesToProvide,
    }),
  ]);
};

export default ThemeProvider;
