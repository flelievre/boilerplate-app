import {
  useContext,
  useState,
  useEffect,
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router';
import {
  AppContext,
  useBoolean,
  BreadcrumbsContext,
  generateHabilitations,
} from '@/utils';
import {
  AuthUserContext,
} from '@/contexts';
import createPersistedState from 'use-persisted-state';
import ROUTES from '@/routes';
import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';

const useOrganizationIdLastSelectedState = createPersistedState('organizationIdLastSelected');

const useAuthenticatedLayout = () => {
  const {
    t,
    lang,
    setLanguage,
    APP_SUPPORTED_LANGUAGES,
    toggleTheme,
    themeName,
    isAppLoading,
    isMobileOrTablet,
    generateRoute,
    isMobile,
  } = useContext(AppContext);
  const {
    breadcrumbs,
  } = useContext(BreadcrumbsContext);
  const [organizationIdLastSelected, setOrganizationIdLastSelected] = useOrganizationIdLastSelectedState('');

  const navigate = useNavigate();

  const {
    signOut,
    authUser,
    authUser: {
      _id: authUserId,
      organizations = [],
      firstName = '',
      lastName = '',
      lang: userLang = lang,
    } = {},
  } = useContext(AuthUserContext);

  useEffect(() => {
    if (
      lang
      && authUserId
      && firstName
      && lastName
      && lang !== userLang
    ) {
      axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/me`, {
        lang,
        firstName,
        lastName,
      })
    }
  }, [lang, authUserId, firstName, lastName]);

  const [
    drawerLinks,
    setDrawerLinks,
  ] = useState([]);

  const [
    bottomDrawerLinks,
    setBottomDrawerLinks,
  ] = useState([]);

  const [
    activeDrawerLinkKey,
    setActiveDrawerLinkKey,
  ] = useState('');

  const {
    value: isDrawerOpen,
    setTrue: showDrawer,
    setFalse: hideDrawer,
    toggleValue: toggleDrawer,
  } = useBoolean({ defaultValue: isMobileOrTablet });

  const closeDrawerIfMobile = () => {
    if (isMobileOrTablet) {
      hideDrawer();
    }
  };

  useEffect(() => {
    if (isMobileOrTablet) {
      hideDrawer();
    } else {
      showDrawer();
    }
  }, [isMobileOrTablet]);

  const {
    organizationId: organizationIdInUrl = '',
  } = useParams();

  const currentOrganization = (
    organizations.find(({ _id }) => (_id === organizationIdInUrl))
    || {
      _id: '',
      name: '',
    }
  );

  useEffect(() => {
    if (
      organizationIdInUrl
      && (currentOrganization._id === '')
    ) {
      navigate(generateRoute(`${ROUTES.organizations}/${organizations[0]._id}/${ROUTES.dashboard}`))
    }
  }, [organizationIdInUrl, currentOrganization._id]);

  const generateOrganizationRoute = (route, organizationId = currentOrganization._id) => (
    generateRoute(`${ROUTES.organizations}/${organizationId}/${route}`)
  );

  const authUserHabilitations = generateHabilitations({
    user: authUser,
    organization: currentOrganization,
  });

  const {
    userCanReadOrganizationUsers = false,
    userCanCreateOrganizationUsers = false,
  } = authUserHabilitations || {};

  useEffect(() => {
    if (currentOrganization._id) {
      setOrganizationIdLastSelected(currentOrganization._id);
      setDrawerLinks(
        [
          {
            key: ROUTES.dashboard,
            label: t('Dashboard'),
            icon: 'streamline:dashboard-3-solid',
            to : generateOrganizationRoute(ROUTES.dashboard, currentOrganization._id),
            onClick: () => {
              setActiveDrawerLinkKey(ROUTES.dashboard);
            },
          },
          (userCanReadOrganizationUsers || userCanCreateOrganizationUsers) && {
            key: ROUTES.team,
            label: t('Team'),
            icon: 'heroicons:users-solid',
            to : generateOrganizationRoute(`${ROUTES.team}/${ROUTES.members}/${ROUTES.registered}`, currentOrganization._id),
            onClick: () => {
              setActiveDrawerLinkKey(ROUTES.team);
            },
          },
        ].filter(Boolean)
      )
      setBottomDrawerLinks(
        [
          {
            key: ROUTES.dashboard,
            label: t('Organization settings'),
            to : generateOrganizationRoute(`${ROUTES.settings}/${ROUTES.information}`, currentOrganization._id),
            onClick: () => {
              console.log('clicked');
            },
          },
          (userCanReadOrganizationUsers || userCanCreateOrganizationUsers) && {
            key: ROUTES.team,
            label: t('User management'),
            to : generateOrganizationRoute(`${ROUTES.team}/${ROUTES.members}/${ROUTES.registered}`, currentOrganization._id),
            onClick: () => {
              setActiveDrawerLinkKey(ROUTES.team);
            },
          },
        ].filter(Boolean)
      )
    }
  }, [currentOrganization._id]);

  const firstOrganizationDashboardRoute = generateOrganizationRoute(ROUTES.dashboard, organizations[0]._id);

  const startSubscriptionFunnel = async () => {
    const {
      data: {
        data: {
          subscriptionFunnel: {
            _id: subscriptionFunnelId = '',
          } = {},
        } = {},
      } = {},
    } = await axios.requestWithAuth('post', `${VITE_BACKEND_URL}/${ROUTES.organizations}/${currentOrganization._id}/${ROUTES.subscriptionFunnels}`);

    await navigate(generateOrganizationRoute(`${ROUTES.subscriptionFunnels}/${subscriptionFunnelId}`));
  };

  const startFunnelOrManageSubscription = async () => {
    currentOrganization.subscription
      ? navigate(generateOrganizationRoute(`${ROUTES.settings}/${ROUTES.information}`))
      : startSubscriptionFunnel();
  };

  return {
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
    generateOrganizationRoute,
    firstOrganizationDashboardRoute,
    navigate,
    firstName,
    lastName,
    breadcrumbs,
    authUserId,
    authUserHabilitations,
    generateRoute,
    bottomDrawerLinks,
    startFunnelOrManageSubscription,
  };
};

export default useAuthenticatedLayout;
