import React from 'react';
import {
  AppBar,
  LinearProgress,
  Box,
  Toolbar,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import logoLarge from '/logo-large.jpg';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  LanguageMenuButton,
  ThemeSwitcherButton,
  BreadcrumbsResponsive,
} from '@/utils';
import {
  OrganizationSelect,
 } from '../OrganizationSelect';
import ROUTES from '@/routes';
import {
  Notifications,
} from './AuthenticatedNavBar.components';

const AuthenticatedNavBar = ({
  APP_SUPPORTED_LANGUAGES = [],
  setLanguage = () => {},
  t = () => {},
  lang = '',
  toggleTheme = () => {},
  toggleDrawer = () => {},
  isDrawerOpen = false,
  themeName = 'light',
  isAppLoading = false,
  currentOrganization = {},
  organizations = [],
  generateOrganizationRoute = () => {},
  navigate = () => {},
  isMobile = false,
  breadcrumbs = [],
  generateRoute = () => {},
}) => (
  <AppBar
    position="fixed"
    elevation={1}
    component="header"
    color="default"
  >
    {isAppLoading && (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )}
      <Stack>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: '5px !important',
          }}
        >
          <Box>
            <IconButton
              onClick={toggleDrawer}
            >
              <IconifyIcon
                icon="material-symbols:menu"
                // sx={{ color: 'primary.main' }}
              />
            </IconButton>
            {!isMobile
            ? (
              <>
                <OrganizationSelect
                  t={t}
                  currentOrganization={currentOrganization}
                  organizations={organizations}
                  generateOrganizationRoute={generateOrganizationRoute}
                  onChange={(organizationId) => {
                    const newOrganizationRoute = generateOrganizationRoute(ROUTES.dashboard, organizationId);
                    navigate(newOrganizationRoute);
                  }}
                  isMobile={isMobile}
                />
                <BreadcrumbsResponsive
                  breadcrumbs={breadcrumbs}
                  t={t}
                  isMobile={isMobile}
                  showFirstSeparator={!isDrawerOpen}
                />
              </>
            )
            : (
                <img
                  src={logoLarge}
                  height="50"
                  style={{
                    verticalAlign: 'middle',
                  }}
                />
            )}
          </Box>
          <Box>
            <Notifications
              generateOrganizationRoute={generateOrganizationRoute}
              navigate={navigate}
              generateRoute={generateRoute}
            />
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
          </Box>
        </Toolbar>
        {isMobile && (
          <>
            <Box
              sx={{
                px: 2,
              }}
            >
              <Divider />
            </Box>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
              <OrganizationSelect
                currentOrganization={currentOrganization}
                organizations={organizations}
                onChange={({ target }) => {
                  const newOrganizationRoute = generateOrganizationRoute(ROUTES.dashboard, target.value);
                  navigate(newOrganizationRoute);
                }}
                isMobile={isMobile}
              />
              <BreadcrumbsResponsive
                breadcrumbs={breadcrumbs}
                t={t}
                showFirstSeparator
                isMobile
              />
            </Box>
          </>
        )}
      </Stack>
  </AppBar>
);

export default AuthenticatedNavBar;
