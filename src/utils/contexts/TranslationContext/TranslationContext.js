/*
  Created by François LELIEVRE ©
*/

/* [+] Community imports */
import {
  createContext,
} from 'react';

const TranslationContext = createContext({
  APP_SUPPORTED_LANGUAGES: [],
  lang: '',
  setLanguage: () => {},
  generateRoute: (s) => (s),
  moment: () => {},
  dateFnsLocale: '',
  t: (s) => s,
});

export default TranslationContext;
