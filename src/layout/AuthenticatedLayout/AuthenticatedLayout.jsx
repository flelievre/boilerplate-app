import {
  Outlet,
} from 'react-router';
import {
  useAuthenticatedLayout,
} from './AuthenticatedLayout.logic';
import {
  AuthenticatedNavBar,
  AuthenticatedDrawer,
} from './AuthenticatedLayout.components';
import {
  Box,
} from '@mui/material';

const AuthenticatedLayout = () => {
  const {
    t,
    lang,
    setLanguage,
    APP_SUPPORTED_LANGUAGES,
    toggleTheme,
    themeName,
    isAppLoading,
    signOut,  
    toggleDrawer,
    isDrawerOpen,
    closeDrawerIfMobile,
    drawerLinks,
    setDrawerLinks,
    activeDrawerLinkKey,
    setActiveDrawerLinkKey,
    organizations,
    currentOrganization,
    isMobile,
    firstOrganizationDashboardRoute,
    generateOrganizationRoute,
    navigate,
    firstName,
    lastName,
    breadcrumbs,
    authUserId,
    authUserHabilitations,  
    generateRoute,
    bottomDrawerLinks,
    startFunnelOrManageSubscription,
  } = useAuthenticatedLayout();

  return (
    <Box sx={{ display: 'flex' }}>
      <AuthenticatedNavBar
        APP_SUPPORTED_LANGUAGES={APP_SUPPORTED_LANGUAGES}
        setLanguage={setLanguage}
        t={t}
        lang={lang}
        toggleTheme={toggleTheme}
        themeName={themeName}
        isAppLoading={isAppLoading}
        toggleDrawer={toggleDrawer}
        isDrawerOpen={isDrawerOpen}
        organizations={organizations}
        currentOrganization={currentOrganization}
        generateOrganizationRoute={generateOrganizationRoute}
        navigate={navigate}
        isMobile={isMobile}
        breadcrumbs={breadcrumbs}
        generateRoute={generateRoute}
      />
      <AuthenticatedDrawer
        generateOrganizationRoute={generateOrganizationRoute}
        drawerLinks={drawerLinks}
        bottomDrawerLinks={bottomDrawerLinks}
        toggleDrawer={toggleDrawer}
        isDrawerOpen={isDrawerOpen}
        closeDrawerIfMobile={closeDrawerIfMobile}
        setDrawerLinks={setDrawerLinks}
        organizations={organizations}
        currentOrganization={currentOrganization}
        activeDrawerLinkKey={activeDrawerLinkKey}
        firstOrganizationDashboardRoute={firstOrganizationDashboardRoute}
        navigate={navigate}
        firstName={firstName}
        lastName={lastName}
        isMobile={isMobile}
        signOut={signOut}
        authUserId={authUserId}
        startFunnelOrManageSubscription={startFunnelOrManageSubscription}
      />
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          px: 3,
          pt: {
            xs: '110px',
            sm: '120px',
            md: '72px',
          },
          marginLeft: (isDrawerOpen && !isMobile)
            ? '240px'
            : 0,
          pb: 10,
          transition: theme.transitions.create('margin-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'auto',
        })}
      >
        <Outlet
          context={{
            setActiveDrawerLinkKey,
            activeDrawerLinkKey,
            currentOrganization,
            generateOrganizationRoute,
            authUserHabilitations,
            startFunnelOrManageSubscription,
          }}
        />
      </Box>
    </Box>
  );
};

export default AuthenticatedLayout;
