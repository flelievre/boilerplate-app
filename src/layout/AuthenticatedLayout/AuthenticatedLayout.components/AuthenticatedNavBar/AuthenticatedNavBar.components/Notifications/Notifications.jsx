import {
  useNotifications,
 } from './Notifications.logic';
import {
  NotificationsButton,
  NotificationsMenu,
} from './Notifications.components';

const Notifications = ({
  generateOrganizationRoute = () => {},
  navigate = () => {},
  generateRoute = () => {},
}) => {
  const {
    handleNotificationsButtonClick,
    isNotificationsMenuOpen,
    authUserCounterNotificationsUnseen,
    anchorNotificationsEl,
    handleNotificationsButtonClose,
    notifications,
    onNotificationClick,
    dateFnsLocale,
    t,
    anchorManageNotificationsEl,
    isManageNotificationsMenuOpen,
    handleManageNotificationsButtonClick,
    handleManageNotificationsButtonClose,
    seeAllNotifications,
    themeName,
    isAppLoading,
    loadMoreNotifications,
    isLoadingNotifications,
    canLoadMoreNotifications,
    areLoadingAllNotifications,
    setNotifMenuSkeletonWidth,
    notifBodySkeletonWidth,
    notifTitleSkeletonWidth,
    notifDateSkeletonWidth,
    closeAllNotificationsMenus,
    isMobile,
  } = useNotifications({
    generateOrganizationRoute,
    navigate,
    generateRoute,
  });
  return (
    <>
      <NotificationsButton
        t={t}
        isMobile={isMobile}
        handleNotificationsButtonClick={handleNotificationsButtonClick}
        isNotificationsMenuOpen={isNotificationsMenuOpen}
        authUserCounterNotificationsUnseen={authUserCounterNotificationsUnseen}
      />
      <NotificationsMenu
        t={t}
        generateOrganizationRoute={generateOrganizationRoute}
        anchorNotificationsEl={anchorNotificationsEl}
        isNotificationsMenuOpen={isNotificationsMenuOpen}
        handleNotificationsButtonClose={handleNotificationsButtonClose}
        closeAllNotificationsMenus={closeAllNotificationsMenus}
        onNotificationClick={onNotificationClick}
        notifications={notifications}
        dateFnsLocale={dateFnsLocale}
        anchorManageNotificationsEl={anchorManageNotificationsEl}
        isManageNotificationsMenuOpen={isManageNotificationsMenuOpen}
        handleManageNotificationsButtonClick={handleManageNotificationsButtonClick}
        handleManageNotificationsButtonClose={handleManageNotificationsButtonClose}
        themeName={themeName}
        seeAllNotifications={seeAllNotifications}
        isAppLoading={isAppLoading}
        isLoadingNotifications={isLoadingNotifications}
        loadMoreNotifications={loadMoreNotifications}
        canLoadMoreNotifications={canLoadMoreNotifications}
        areLoadingAllNotifications={areLoadingAllNotifications}
        setNotifMenuSkeletonWidth={setNotifMenuSkeletonWidth}
        notifBodySkeletonWidth={notifBodySkeletonWidth}
        notifTitleSkeletonWidth={notifTitleSkeletonWidth}
        notifDateSkeletonWidth={notifDateSkeletonWidth}
      />
    </>
  );
};

export default Notifications;
