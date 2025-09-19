import {
  useEffect,
} from 'react';
import {
  format,
} from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import createPersistedState from 'use-persisted-state';
import {
  fromNow as fromNowWithoutLocale,
} from '@/utils';
import {
  translate,
  replaceLangInUrl,
  getUrlLang,
  detectInitialLang,
 } from '../TranslationContext.functions';

const useLanguageState = createPersistedState('lang');

const useTranslationContextLogic = ({
  translations = {},
  forcedDefaultLanguage = '',
} = {}) => {
  const APP_SUPPORTED_LANGUAGES = Object.keys(translations);
  const defaultLanguage = forcedDefaultLanguage || detectInitialLang(APP_SUPPORTED_LANGUAGES);

  const urlLang = getUrlLang(APP_SUPPORTED_LANGUAGES);
  const [lang, setLanguage] = useLanguageState(defaultLanguage);

  const dateFnsLocale = lang === 'fr' ? fr : enUS;

  useEffect(() => {
    if (urlLang && lang !== urlLang) {
      setLanguage(urlLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', JSON.stringify(lang));
    }

    const currentUrlLang = window.location.pathname.split('/')[1];
    if (currentUrlLang !== lang) {
      window.history.replaceState(
        null,
        `${lang} state`,
        replaceLangInUrl(`/${lang}`),
      );
    }
  }, [lang]);

  const generateRoute = (route) => `/${lang}/${route}`;

  const t = (key, params) => translate(key, params, lang, translations);

  const fromNow = (date) => fromNowWithoutLocale(date, dateFnsLocale);

  const formatDate = (date) => format(date, 'd MMMM yyyy', { locale: dateFnsLocale });

  return {
    APP_SUPPORTED_LANGUAGES: Object.keys(translations),
    lang,
    setLanguage,
    generateRoute,
    dateFnsLocale,
    fromNow,
    formatDate,
    t,
  };
};

export default useTranslationContextLogic;