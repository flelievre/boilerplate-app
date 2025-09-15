import {
  useEffect,
  useContext,
} from 'react';
import {
  useOutletContext,
  useParams,
} from 'react-router';
import {
  AuthUserContext,
} from '@/contexts';
import ROUTES from '@/routes';
import {
  BreadcrumbsContext,
  AppContext,
  useTabs,
} from '@/utils';

const useUserProfilePage = () => {
  const {
    generateOrganizationRoute,
    setActiveDrawerLinkKey,
  } = useOutletContext();
  const {
    setBreadcrumbs,
  } = useContext(BreadcrumbsContext);
  const {
    t,
    isMobileOrTablet,
    isMobile,
  } = useContext(AppContext);
  const {
    authUser,
    authUser: {
      _id: authUserId,
    } = {},
  } = useContext(AuthUserContext);
  const {
    userId,
  } = useParams();

  const userToEditIsAuthUser = (authUserId === userId);

  const {
    firstName,
    lastName,
    avatarUrl,
  } = userToEditIsAuthUser
    ? authUser
    : {};

  const tabInfos = [
    {
      routeTo: ROUTES.profile,
      label: t('Profile'),
      key: 'profile',
      icon: 'mingcute:profile-line',
    },
    // {
    //   routeTo: ROUTES.notifications,
    //   label: t('Notifications'),
    //   key: 'notifications',
    //   icon: 'mingcute:notification-line',
    // },
  ];

  const {
    tabsUriBaseRoute,
    activeTabIndex,
  } = useTabs({
    tabInfos,
  });

  useEffect(() => {
    setBreadcrumbs([
      {
        label: userToEditIsAuthUser
          ? t('My profile')
          : `${firstName} ${lastName}`,
        to: generateOrganizationRoute(`${ROUTES.users}/${userId}/${ROUTES.profile}`),
        sx: {
          color: 'primary.main',
        },
        icon: 'heroicons:user-solid',
      },
    ]);
    setActiveDrawerLinkKey(ROUTES.profile);
  }, []);

  return {
    t,
    activeTabIndex,
    isMobileOrTablet,
    tabInfos,
    tabsUriBaseRoute,
    isMobile,
    firstName,
    lastName,
    avatarUrl,
    userToEditIsAuthUser,
  };
};

export default useUserProfilePage;
