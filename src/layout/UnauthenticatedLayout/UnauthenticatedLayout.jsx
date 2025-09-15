import {
  Outlet,
} from 'react-router';
import {
  useUnauthenticatedLayout,
} from './UnauthenticatedLayout.logic';
import {
  UnauthenticatedNavBar,
} from './UnauthenticatedLayout.components';

const UnauthenticatedLayout = () => {
  const {
    t,
    lang,
    setLanguage,
    APP_SUPPORTED_LANGUAGES,
    toggleTheme,
    themeName,
    isAppLoading,
  } = useUnauthenticatedLayout();

  return (
    <>
      <UnauthenticatedNavBar
        APP_SUPPORTED_LANGUAGES={APP_SUPPORTED_LANGUAGES}
        setLanguage={setLanguage}
        t={t}
        lang={lang}
        toggleTheme={toggleTheme}
        themeName={themeName}
        isAppLoading={isAppLoading}
      />
      <Outlet />
    </>
  );
};

export default UnauthenticatedLayout;
