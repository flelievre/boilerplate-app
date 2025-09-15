import {
  IconButton,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';

const NotificationsButton = ({
  t = (s) => s,
  handleNotificationsButtonClick = () => {},
  isNotificationsMenuOpen = false,
  isMobile = false,
  authUserCounterNotificationsUnseen = 0,
}) => (
  <Tooltip title={t('Notifications')}>
    <IconButton
      onClick={handleNotificationsButtonClick}
      sx={{
        mr: isMobile
          ? 1.25
          : 1.5,
      }}
      aria-controls={isNotificationsMenuOpen ? 'notifications-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={isNotificationsMenuOpen ? 'true' : undefined}
      color={isNotificationsMenuOpen ? 'primary' : 'default'}
    >
      <Badge badgeContent={authUserCounterNotificationsUnseen} color="error">
        <IconifyIcon icon="material-symbols:notifications" />
      </Badge>
    </IconButton>
  </Tooltip>
);

export default NotificationsButton;
