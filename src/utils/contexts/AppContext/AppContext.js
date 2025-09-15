/*
  Created by François LELIEVRE ©
*/

/* [+] Community imports */
import {
  createContext,
} from 'react';

const AppContext = createContext({
  isLargeDesktop: false,
  isDesktop: false,
  isMobile: false,
  isTablet: false,
  isMobileOrTablet: false,
  isAppOnline: false,
  isAppLoading: false,
  toastifyLoading: () => {},
  toastifySuccessMessage: () => {},
  toastifyWarningMessage: () => {},
  toastifyErrorMessage: () => {},
  dismissToast: () => {},
  APP_SUPPORTED_LANGUAGES: [],
  lang: '',
  setLanguage: () => {},
  generateRoute: (s) => (s),
  moment: () => {},
  dateFnsLocale: '',
  t: (s) => s,
  toggleTheme: () => {},
  switchToLightTheme: () => {},
  switchToDarkTheme: () => {},
  isThemeDark: false,
  themeName: 'light',
  handleFormSubmission: () => {},
  setIsAppLoading: () => {},
});

export default AppContext;
