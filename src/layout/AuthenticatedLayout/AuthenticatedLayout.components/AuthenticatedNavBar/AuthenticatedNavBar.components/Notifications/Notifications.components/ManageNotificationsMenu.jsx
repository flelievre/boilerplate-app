import {
  Link as ReactRouterLink,
} from 'react-router';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  CircularProgress,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import ROUTES from '@/routes';

const ManageNotificationsMenu = ({
  t = (s) => s,
  anchorManageNotificationsEl = null,
  isManageNotificationsMenuOpen = false,
  handleManageNotificationsButtonClose = () => {},
  closeAllNotificationsMenus = () => {},
  seeAllNotifications = () => {},
  generateOrganizationRoute = () => {},
  themeName = '',
  isAppLoading = false,
}) => (
  <Menu
    anchorEl={anchorManageNotificationsEl}
    id="manage-notifications-menu"
    open={isManageNotificationsMenuOpen}
    onClose={handleManageNotificationsButtonClose}
    PaperProps={{
      elevation: 0,
      sx: {
        p: 1,
        bgcolor: (themeName === 'light') ? '' : 'neutralLight.main',
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: (themeName === 'light') ? 'background.paper' : 'neutralLight.main',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    <MenuItem
      onClick={seeAllNotifications}
      sx={{ borderRadius: '5px' }}
    >
      <ListItemIcon>
        {(isAppLoading
          ? <CircularProgress size="1rem" />
          : <IconifyIcon icon="material-symbols:checklist-rtl-rounded" />
        )}
      </ListItemIcon>
      {t('Mark all as read')}
    </MenuItem>
    <MenuItem
      sx={{ borderRadius: '5px' }}
      component={ReactRouterLink}
      to={generateOrganizationRoute(ROUTES.myNotificationsPreferences)}
      onClick={closeAllNotificationsMenus}
    >
      <ListItemIcon>
        <IconifyIcon icon="material-symbols:settings" />
      </ListItemIcon>
      {t('Notifications preferences')}
    </MenuItem>
  </Menu>
);

export default ManageNotificationsMenu;
