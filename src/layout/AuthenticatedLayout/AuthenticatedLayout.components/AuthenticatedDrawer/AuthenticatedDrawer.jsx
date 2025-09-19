import React from 'react';
import {
  Link as ReactRouterLink,
} from 'react-router';
import logoLarge from '/logo-large.jpg';
import {
  Typography,
  Button,
  Toolbar,
  IconButton,
  Divider,
  Box,
  List,
  ListItemText,
  LinearProgress,
  ListItemButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  generateProgressColor,
  DrawerWithTransition,
  IconRollingButton,
} from '@/utils';
import {
  useAuthenticatedDrawer,
} from './AuthenticatedDrawer.logic';
import {
  OrganizationSelect,
} from '../OrganizationSelect';
import ROUTES from '@/routes';

const AuthenticatedDrawer = ({
  isDrawerOpen = true,
  drawerLinks = [],
  drawerWidth = 240,
  toggleDrawer = () => {},
  firstOrganizationDashboardRoute = '',
  organizations = [],
  currentOrganization = {},
  activeDrawerLinkKey = '',
  closeDrawerIfMobile = () => {},
  generateOrganizationRoute = () => {},
  startFunnelOrManageSubscription = () => {},
  navigate = () => {},
  signOut = () => {},
  firstName = '',
  lastName = '',
  authUserId = '',
  isMobile = false,
  bottomDrawerLinks = [],
} = {}) => {
  const {
    t,
    showLoadingBar,
    credits,
    planName,
    planMaxCredits,
    hasSubscription,
    creditsProgressBarValue,
    anchorProfileMenuEl,
    isProfileMenuOpen,
    handleProfileButtonClick,
    handleProfileButtonClose,
  } = useAuthenticatedDrawer({
    currentOrganization,
  });

  return (
    <DrawerWithTransition
      drawerWidth={drawerWidth}
      isMobile={isMobile}
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isDrawerOpen}
      onClose={toggleDrawer}
      ModalProps={{
        keepMounted: isMobile,
      }}
      sx={{
        zIndex: isDrawerOpen ? 1200 : -1,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
          <IconButton onClick={toggleDrawer}>
            <IconifyIcon
              icon="material-symbols:chevron-left"
            />
          </IconButton>
            {(currentOrganization._id
              ? (
                  <OrganizationSelect
                    currentOrganization={currentOrganization}
                    organizations={organizations}
                    generateOrganizationRoute={generateOrganizationRoute}
                    onChange={(organizationId) => {
                      const newOrganizationRoute = generateOrganizationRoute(ROUTES.dashboard, organizationId);
                      navigate(newOrganizationRoute);
                    }}
                    t={t}
                  />
              ) : (
                <Box>
                  <Button
                    variant="contained"
                    component={ReactRouterLink}
                    to={firstOrganizationDashboardRoute}
                    startIcon={(
                      <IconifyIcon
                        icon="material-symbols:chevron-left"
                      />
                    )}
                  >
                    {t('Back')}
                  </Button>
                </Box>
              )
            )}
          </Toolbar>

          {showLoadingBar && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          )}
          <Divider sx={{ mb: showLoadingBar ? 0 : '4px' }} />
          <Box
            sx={{
              width: '100%',
              p: 1,
            }}
          >
            <Typography
              variant="body2"
              textAlign="center"
            >
              <b>{t(planName || '')}</b>
            </Typography>
            <Typography
              variant="caption"
              display="block"
              textAlign="center"
            >
              {`${credits}/${planMaxCredits} ${t('credits left')}`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={creditsProgressBarValue}
              sx={{
                borderRadius: 2.5,
              }}
              color={generateProgressColor(creditsProgressBarValue)}
            />
            <Button
              variant="contained"
              onClick={() => startFunnelOrManageSubscription()}
              fullWidth
              size="small"
              sx={{
                mt: 1,
              }}
            >
              {(hasSubscription
                ? t('Manage')
                : t('Upgrade')
              )}
            </Button>
          </Box>
          <Divider sx={{ mb: showLoadingBar ? 0 : '4px' }} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <List
            sx={{ px: 1.5 }}
          >
            {drawerLinks.map(({
              key = '',
              label = '',
              to = '',
              icon = '',
            }) => (
              <ListItemButton
                key={key}
                sx={{
                  height: 35,
                  fontSize: '0.95em',
                  mb: 1,
                  borderRadius: 0.9,
                  color: (key === activeDrawerLinkKey)
                    ? 'primary.dark'
                    : 'primary',
                }}
                selected={key === activeDrawerLinkKey}
                component={ReactRouterLink}
                onClick={closeDrawerIfMobile}
                to={to}
              >
                {icon && (
                  <IconifyIcon
                    icon={icon}
                  />
                )}
                <ListItemText
                  primaryTypographyProps={{
                    sx: {
                      pl: 1,
                      fontSize: '0.95em',
                      fontWeight: (key === activeDrawerLinkKey)
                        ? 600
                        : 400,
                    },
                  }}
                  primary={label}
                />
              </ListItemButton>
            ))}
          </List>
          <List
            sx={{ px: 1.5 }}
          >
            {bottomDrawerLinks.map(({
              key = '',
              label = '',
              to = '',
              icon = '',
            }) => (
              <ListItemButton
                key={key}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: 30,
                  borderRadius: 0.9,
                }}
                component={ReactRouterLink}
                onClick={closeDrawerIfMobile}
                to={to}
              >
                {icon && <IconifyIcon icon={icon} />}
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '0.9em',
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Box>
          <Divider />
          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Avatar
              src="https://mui.com/static/images/avatar/1.jpg"
              sx={{
                width: 32,
                height: 32,
              }}
            />
            <Box>
              <Typography
                variant="body2"
              >
                {firstName}
              </Typography>
              <Typography
                variant="body2"
              >
                {lastName}
              </Typography>
            </Box>
            <IconRollingButton
              onClick={handleProfileButtonClick}
            />
          </Box>
          <Divider />
        </Box>
        <Menu
          anchorEl={anchorProfileMenuEl}
          id="account-menu"
          open={isProfileMenuOpen}
          onClose={handleProfileButtonClose}
          onClick={handleProfileButtonClose}
          MenuListProps={{
            sx: {
              py: 0, // <- supprime le padding vertical
            },
          }}
          PaperProps={{
            elevation: 1,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.32))',
              p: '0.5rem !important',
              mt: 1.5,
            },
          }}
          transformOrigin={{ horizontal: 'left', vertical: 'center' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            component={ReactRouterLink}
            to={generateOrganizationRoute(`${ROUTES.users}/${authUserId}/${ROUTES.profile}`)}
            sx={{
              flex: 1,
              borderRadius: 1,
            }}
            onClick={closeDrawerIfMobile}
          >
            <ListItemIcon>
              <Avatar
                src="https://mui.com/static/images/avatar/1.jpg"
                sx={{
                  width: 24,
                  height: 24,
                  ml: -1,
                  mr: 1,
                }}
              />
            </ListItemIcon>
            {t('Profile')}
          </MenuItem>
          <MenuItem
            component={ReactRouterLink}
            to={generateOrganizationRoute(`${ROUTES.invitations}/${ROUTES.pending}`)}
            sx={{
              flex: 1,
            }}
            onClick={closeDrawerIfMobile}
          >
            <ListItemIcon sx={{
                ml: -0.25,
              }}>
                <IconifyIcon icon="fluent:people-team-add-20-regular" />
              </ListItemIcon>
            {t('Invitations')}
          </MenuItem>
          <Divider />
          <MenuItem
            sx={{
              flex: 1,
            }}
            onClick={signOut}
          >
            <ListItemIcon sx={{
              color: 'red',
              ml: -0.25,
            }}>
              <IconifyIcon icon="famicons:power" />
            </ListItemIcon>
            {t('Logout')}
          </MenuItem>
        </Menu>
        <Box>
          <img
            src={logoLarge}
            height="50"
          />
        </Box>
      </Box>
    </DrawerWithTransition>
  );
};

export default AuthenticatedDrawer;
