import browserLang from 'browser-lang';
import getUrlLang from './getUrlLang';

const detectInitialLang = (appSupportedLanguages) => {
  const urlLang = getUrlLang(appSupportedLanguages);
  if (urlLang) return urlLang;
  return browserLang({ languages: appSupportedLanguages, fallback: 'en' });
};

export default detectInitialLang;
