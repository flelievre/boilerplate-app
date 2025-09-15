import {
  Menu,
} from '@mui/material';
import NotificationsList from './NotificationsList';

const NotificationsMenu = ({
  anchorNotificationsEl = null,
  isNotificationsMenuOpen = false,
  handleNotificationsButtonClose = () => {},
  onNotificationClick = () => {},
  generateOrganizationRoute = () => {},
  closeAllNotificationsMenus = () => {},
  notifications = [],
  dateFnsLocale = 'en-US',
  t = (s) => s,
  anchorManageNotificationsEl = null,
  isManageNotificationsMenuOpen = false,
  handleManageNotificationsButtonClick = () => {},
  handleManageNotificationsButtonClose = () => {},
  seeAllNotifications = () => {},
  themeName = '',
  isAppLoading = false,
  loadMoreNotifications = () => {},
  isLoadingNotifications = false,
  canLoadMoreNotifications = false,
  areLoadingAllNotifications = false,
  setNotifMenuSkeletonWidth = () => {},
  notifBodySkeletonWidth = 0,
  notifTitleSkeletonWidth = 0,
  notifDateSkeletonWidth = 0,
}) => (
  <Menu
    anchorEl={anchorNotificationsEl}
    id="notifications-menu"
    open={isNotificationsMenuOpen}
    onClose={handleNotificationsButtonClose}
    PaperProps={{
      elevation: 0,
      sx: {
        pt: 0,
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.32))',
        mt: 1.5,
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 105,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: 'center', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
  >
    <NotificationsList
      notifications={notifications}
      onNotificationClick={onNotificationClick}
      dateFnsLocale={dateFnsLocale}
      t={t}
      anchorManageNotificationsEl={anchorManageNotificationsEl}
      isManageNotificationsMenuOpen={isManageNotificationsMenuOpen}
      handleManageNotificationsButtonClick={handleManageNotificationsButtonClick}
      handleManageNotificationsButtonClose={handleManageNotificationsButtonClose}
      closeAllNotificationsMenus={closeAllNotificationsMenus}
      themeName={themeName}
      seeAllNotifications={seeAllNotifications}
      isAppLoading={isAppLoading}
      loadMoreNotifications={loadMoreNotifications}
      isLoadingNotifications={isLoadingNotifications}
      canLoadMoreNotifications={canLoadMoreNotifications}
      areLoadingAllNotifications={areLoadingAllNotifications}
      setNotifMenuSkeletonWidth={setNotifMenuSkeletonWidth}
      notifBodySkeletonWidth={notifBodySkeletonWidth}
      notifTitleSkeletonWidth={notifTitleSkeletonWidth}
      notifDateSkeletonWidth={notifDateSkeletonWidth}
      generateOrganizationRoute={generateOrganizationRoute}
    />
  </Menu>
);

export default NotificationsMenu;
