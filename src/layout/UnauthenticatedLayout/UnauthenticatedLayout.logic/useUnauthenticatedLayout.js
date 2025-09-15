import {
  useContext,
} from 'react';
import {
  AppContext,
} from '@/utils';

const useUnauthenticatedLayout = () => {
  const {
    t,
    lang,
    setLanguage,
    APP_SUPPORTED_LANGUAGES,
    toggleTheme,
    themeName,
    isAppLoading,
  } = useContext(AppContext);

  return {
    t,
    lang,
    setLanguage,
    APP_SUPPORTED_LANGUAGES,
    toggleTheme,
    themeName,
    isAppLoading,
  };
};

export default useUnauthenticatedLayout;
