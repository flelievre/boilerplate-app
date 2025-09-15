import {
  useContext,
} from 'react';
import {
  AppContext,
  useAnchor,
} from '@/utils';
import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';
import ROUTES from '@/routes';

const useAuthenticatedDrawer = ({
  currentOrganization = {},
  generateOrganizationRoute = () => {},
  navigate = () => {},
}) => {
  const {
    t,
    isMobile,
  } = useContext(AppContext);

  const {
    credits,
    plan,
    planMaxCredits,
    creditsProgressBarValue,
    hasSubscription,
  } = {
    credits: 0,
    plan: 'free',
    planMaxCredits: 1000,
    creditsProgressBarValue: 0,
    hasSubscription: false,
  };

  const {
    anchorEl: anchorProfileMenuEl,
    isOpen: isProfileMenuOpen,
    handleClick: handleProfileButtonClick,
    handleClose: handleProfileButtonClose,
  } = useAnchor();

  const bottomDrawerLinks = [
    {
      key: ROUTES.dashboard,
      label: t('Organization settings'),
      to : 'a',
      onClick: () => {
        console.log('clicked');
      },
    },
    {
      key: ROUTES.dashboard,
      label: t('User management'),
      to : 'a',
      onClick: () => {
        console.log('clicked');
      },
    },
  ];

  const handleUpgradeOrManageSubscriptionClick = async () => {
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

  return {
    t,
    isMobile,
    credits,
    plan,
    planMaxCredits,
    creditsProgressBarValue,
    hasSubscription,
    anchorProfileMenuEl,
    isProfileMenuOpen,
    handleProfileButtonClick,
    handleProfileButtonClose,
    bottomDrawerLinks,
    handleUpgradeOrManageSubscriptionClick,
  };
};

export default useAuthenticatedDrawer;
