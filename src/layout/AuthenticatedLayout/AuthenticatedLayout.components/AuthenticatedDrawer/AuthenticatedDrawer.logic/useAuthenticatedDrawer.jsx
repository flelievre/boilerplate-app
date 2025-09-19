import {
  useContext,
} from 'react';
import {
  AppContext,
  useAnchor,
} from '@/utils';
import ROUTES from '@/routes';

const useAuthenticatedDrawer = ({
  currentOrganization = {},
}) => {
  const {
    t,
    isMobile,
  } = useContext(AppContext);

  const {
    credits: currentSubscriptionCredits = 0,
    subscription = null,
    freeTrialMaxCredits = 500,
    freeTrialCreditsLeft = 500,
  } = currentOrganization;

  const hasSubscription = !!subscription;

  const credits = hasSubscription
    ? currentSubscriptionCredits
    : freeTrialCreditsLeft;

  const {
    planMaxCredits = freeTrialMaxCredits,
    planName = 'Free',
  } = subscription || {};

  const creditsProgressBarValue = (credits / planMaxCredits) * 100;

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

  return {
    t,
    isMobile,
    credits,
    planName,
    planMaxCredits,
    creditsProgressBarValue,
    hasSubscription,
    anchorProfileMenuEl,
    isProfileMenuOpen,
    handleProfileButtonClick,
    handleProfileButtonClose,
    bottomDrawerLinks,
  };
};

export default useAuthenticatedDrawer;
