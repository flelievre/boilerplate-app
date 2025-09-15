import {
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';

const ManageNotificationsButton = ({
  t = (s) => s,
  isManageNotificationsMenuOpen = false,
  handleManageNotificationsButtonClick = () => {},
}) => (
  <Tooltip title={t('Manage notifications')}>
    <IconButton
      onClick={handleManageNotificationsButtonClick}
      aria-label="notification options"
      aria-controls={isManageNotificationsMenuOpen ? 'manage-notifications-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={isManageNotificationsMenuOpen ? 'true' : undefined}
      color={isManageNotificationsMenuOpen ? 'primary' : 'default'}
    >
      <IconifyIcon icon="material-symbols:more-vert" />
    </IconButton>
  </Tooltip>
);

export default ManageNotificationsButton;
