import {
  useContext,
} from 'react';
import {
  useOutletContext,
} from 'react-router';
import {
  AppContext,
} from '@/utils';
import {
  calculateProgressBarWidth,
} from '../PlanTab.functions';

const usePlanTab = () => {
  const {
    currentOrganization: {
      credits: currentSubscriptionCredits = 0,
      subscription = null,
      freeTrialMaxCredits = 500,
      freeTrialCreditsLeft = 500,
    } = {},
    startFunnelOrManageSubscription,
  } = useOutletContext();

  const {
    t,
    isMobile,
    formatDate,
  } = useContext(AppContext);

  const hasSubscription = !!subscription;

  const credits = hasSubscription
    ? currentSubscriptionCredits
    : freeTrialCreditsLeft;

  const {
    planMaxCredits = freeTrialMaxCredits,
    planName = 'Free',
    currentPeriodEnd = -1,
    createdAt = -1,
    interval = 'month',
  } = subscription || {};

  const creditsProgressBarValue = (credits / planMaxCredits) * 100;

  const periodicity = (interval === 'month')
    ? t('Monthly')
    : t('Yearly');

  const progressBarWidth = calculateProgressBarWidth({
    isMobile,
    planName,
  });

  return {
    t,
    credits,
    planName,
    planMaxCredits,
    hasSubscription,
    isMobile,
    currentPeriodEnd,
    formatDate,
    periodicity,
    creditsProgressBarValue,
    progressBarWidth,
    startFunnelOrManageSubscription,
  };
};

export default usePlanTab;
