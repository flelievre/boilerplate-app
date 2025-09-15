import {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  AppContext,
  useAnchor,
} from '@/utils';
import {
  AuthUserContext,
} from '@/contexts';
import {
  seeNotification,
  seeAllUnseenNotifications,
  getSomeNotifications,
} from '../Notifications.dbFunctions';

const useNotifications = ({
  generateOrganizationRoute = () => {},
  navigate = () => {},
  generateRoute = () => {},
}) => {
  const {
    dateFnsLocale,
    themeName,
    isAppLoading,
    isMobile,
    t,
  } = useContext(AppContext);

  const {
    authUser: {
      notificationsNb: authUserCounterNotifications = 0,
      notificationsNbUnseen: authUserCounterNotificationsUnseen = 0,
    } = {},
  } = useContext(AuthUserContext) || {};
  

  const [notifications, setNotifications] = useState([]);
  const [notifMenuSkeletonWidth, setNotifMenuSkeletonWidth] = useState(0);
  const [shouldReloadNotifications, setShouldReloadNotifications] = useState(true);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const [areLoadingAllNotifications, setAreLoadingAllNotifications] = useState(false);

  const canLoadMoreNotifications = (notifications.length < authUserCounterNotifications);

  const notifBodySkeletonWidth = notifMenuSkeletonWidth
    ? notifMenuSkeletonWidth - 30
    : 0;

  const notifTitleSkeletonWidth = notifBodySkeletonWidth
    ? notifBodySkeletonWidth / 2
    : 0;

  const notifDateSkeletonWidth = notifBodySkeletonWidth
    ? notifBodySkeletonWidth / 3
    : 0;

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoadingNotifications(true);
      const {
        data: {
          data: {
            notifications: someNotifications = [],
          } = {},
        } = {},
      } = await getSomeNotifications() || {};
      setNotifications([...someNotifications]);
      setIsLoadingNotifications(false);
      setAreLoadingAllNotifications(false);
      setShouldReloadNotifications(false);
    };
    if (
      shouldReloadNotifications
      && !isLoadingNotifications
    ) {
      fetchNotifications();
    }
    // eslint-disable-next-line
  }, [shouldReloadNotifications]);

  useEffect(() => {
    setShouldReloadNotifications(true);
  }, [authUserCounterNotifications]);

  const loadMoreNotifications = async () => {
    if (!isLoadingNotifications
      && canLoadMoreNotifications
      && !areLoadingAllNotifications
    ) {
      setIsLoadingNotifications(true);
      const {
        data: {
          data: {
            notifications: someOtherNotifications = [],
          } = {},
        } = {},
      } = await getSomeNotifications({
        skip: (notifications.length > 0)
          ? notifications.length - 1
          : 0,
      });
      setNotifications([...notifications, ...someOtherNotifications]);
      setIsLoadingNotifications(false);
    }
  };

  const {
    anchorEl: anchorNotificationsEl,
    isOpen: isNotificationsMenuOpen,
    handleClick: handleNotificationsButtonClick,
    handleClose: handleNotificationsButtonClose,
  } = useAnchor();

  const {
    anchorEl: anchorManageNotificationsEl,
    isOpen: isManageNotificationsMenuOpen,
    handleClick: handleManageNotificationsButtonClick,
    handleClose: handleManageNotificationsButtonClose,
  } = useAnchor();

  const closeAllNotificationsMenus = () => {
    handleManageNotificationsButtonClose();
    handleNotificationsButtonClose();
  };

  const onNotificationClick = async ({
    notificationId,
    isNotificationSeen,
    link = '',
    linkType = 'external',
  }) => {
    if (
      !isAppLoading
      && !areLoadingAllNotifications
    ) {
      setAreLoadingAllNotifications(true);
      try {
        if (!isNotificationSeen) {
          await seeNotification({
            notificationId,
          });
          setNotifications((prevNotifications) => (
            prevNotifications.map(({ _id, ...rest }) => (
              (_id === notificationId)
                ? {
                  _id,
                  ...rest,
                  seen: true,
                } : {
                  _id,
                  ...rest,
                }
            ))
          ));
          // setShouldReloadNotifications(true);
        }
        if (link) {
          if (linkType === 'external') {
            window.open(link, '_blank');
          } else if (linkType === 'organization') {
            navigate(generateOrganizationRoute(link));
          } else if (linkType === 'app') {
            navigate(generateRoute(link));
          }
          handleManageNotificationsButtonClose();
          handleNotificationsButtonClose();
        }
      } catch (e) {
        // console.error(e);
      }
      setAreLoadingAllNotifications(false);
    }
  };

  const seeAllNotifications = async () => {
    if (
      (authUserCounterNotificationsUnseen > 0)
      && !isAppLoading
      && !areLoadingAllNotifications
    ) {
      setAreLoadingAllNotifications(true);
      try {
        await seeAllUnseenNotifications();
        setShouldReloadNotifications(true);
      } catch (e) {
        // console.error(e);
      }
    }
    handleManageNotificationsButtonClose();
  };

  return {
    handleNotificationsButtonClick,
    isNotificationsMenuOpen,
    authUserCounterNotifications,
    authUserCounterNotificationsUnseen,
    anchorNotificationsEl,
    handleNotificationsButtonClose,
    seeAllNotifications,
    notifications,
    onNotificationClick,
    dateFnsLocale,
    t,
    anchorManageNotificationsEl,
    isManageNotificationsMenuOpen,
    handleManageNotificationsButtonClick,
    handleManageNotificationsButtonClose,
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
    generateOrganizationRoute,
    closeAllNotificationsMenus,
    isMobile,
  };
};

export default useNotifications;
