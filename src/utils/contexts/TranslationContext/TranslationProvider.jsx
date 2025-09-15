import React, {
  useMemo,
} from 'react';
import { Helmet } from 'react-helmet-async';
import TranslationContext from './TranslationContext';
import useTranslationContextLogic from './TranslationContext.logic/useTranslationContextLogic';
import {
  VITE_WEB_APP_URL,
} from '@/config.js';


const TranslationProvider = ({
  children = <></>,
  translations = {},
  defaultLanguage = ''
}) => {

  const {
    APP_SUPPORTED_LANGUAGES,
    ...logic
  } = useTranslationContextLogic({
    translations,
    defaultLanguage,
  });

  const valuesToProvide = {
    APP_SUPPORTED_LANGUAGES,
    ...logic,
  };

  return useMemo(() => (
    <TranslationContext.Provider
      value={{ ...valuesToProvide }}
    >
      <Helmet>
        {APP_SUPPORTED_LANGUAGES.map((locale) => (
          <link
            rel="alternate"
            href={`${VITE_WEB_APP_URL}/${locale}`}
            hrefLang={locale}
            key={locale}
          />
        ))}
      </Helmet>
      {children}
    </TranslationContext.Provider>
  ), [JSON.stringify({ ...valuesToProvide })]);
};

export default TranslationProvider;
