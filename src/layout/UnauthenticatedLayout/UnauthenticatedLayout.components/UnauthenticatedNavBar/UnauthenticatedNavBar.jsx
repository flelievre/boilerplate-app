import React from 'react';
import {
  AppBar,
  LinearProgress,
  Box,
  Toolbar,
} from '@mui/material';
import {
  LanguageMenuButton,
  ThemeSwitcherButton,
} from '@/utils';

const UnauthenticatedNavBar = ({
  APP_SUPPORTED_LANGUAGES = [],
  setLanguage = () => {},
  t = () => {},
  lang = '',
  toggleTheme = () => {},
  themeName = 'light',
  isAppLoading = false,
}) => (
  <AppBar
    position="fixed"
    elevation={0}
    sx={{
      backgroundColor: 'transparent',
      backgroundImage: 'none',
    }}
  >
    {isAppLoading && (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )}
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <LanguageMenuButton
        t={t}
        lang={lang}
        setLanguage={setLanguage}
        APP_SUPPORTED_LANGUAGES={APP_SUPPORTED_LANGUAGES}
      />
      <ThemeSwitcherButton
        t={t}
        themeName={themeName}
        toggleTheme={toggleTheme}
      />
    </Toolbar>
  </AppBar>
);

export default UnauthenticatedNavBar;
