/*
  Created by François LELIEVRE ©
*/

/* [+] Community imports */
import {
  createContext,
} from 'react';

const ScreenContext = createContext({
  isLargeDesktop: false,
  isDesktop: false,
  isMobile: false,
  isTablet: false,
  isMobileOrTablet: false,
});

export default ScreenContext;
