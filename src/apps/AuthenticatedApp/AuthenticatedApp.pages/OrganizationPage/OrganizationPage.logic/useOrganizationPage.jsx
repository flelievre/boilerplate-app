import {
  useContext,
} from 'react';
import {
  useOutletContext,
} from 'react-router';
import ROUTES from '@/routes';
import {
  AppContext,
  useTabs,
} from '@/utils';

const useOrganizationPage = () => {
  const {
    currentOrganization,
  } = useOutletContext();
  const {
    t,
    isMobileOrTablet,
  } = useContext(AppContext);

  const tabInfos = [
    {
      routeTo: ROUTES.information,
      label: t('Plan'),
      key: 'plan',
      icon: 'clarity:blocks-group-solid',
      subLabel: t('Manage your subscription'),
    },
    {
      routeTo: ROUTES.address,
      label: t('Billing address'),
      key: 'address',
      icon: 'heroicons:map-pin-solid',
      subLabel: t('Manage your billing address'),
    },
    {
      routeTo: 'billing',
      label: t('Payment methods'),
      key: 'billing',
      icon: 'heroicons:credit-card-solid',
      subLabel: t('Manage your payment methods'),
    },
    {
      routeTo: 'invoices',
      label: t('Invoices'),
      key: 'invoices',
      icon: 'heroicons:document-text-solid',
      subLabel: t('View and manage invoices'),
    },
    {
      routeTo: 'security',
      label: t('Security'),
      key: 'security',
      icon: 'heroicons:shield-check-solid',
      subLabel: t('Security settings'),
    },
  ];

  const {
    tabsUriBaseRoute,
    activeTabIndex,
  } = useTabs({
    tabInfos,
    nbParams: -1,
  });

  const h1Title = tabInfos[activeTabIndex].label;
  const h2Title = tabInfos[activeTabIndex].subLabel;

  return {
    currentOrganization,
    t,
    tabsUriBaseRoute,
    activeTabIndex,
    tabInfos,
    isMobileOrTablet,
    h1Title,
    h2Title,
  };
};

export default useOrganizationPage;
