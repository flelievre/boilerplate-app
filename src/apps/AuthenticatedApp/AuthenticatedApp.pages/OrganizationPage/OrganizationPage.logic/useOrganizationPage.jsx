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
      label: t('Information'),
      key: 'information',
      icon: 'heroicons:information-circle-solid',
      subLabel: t('Organization details and information'),
    },
    {
      routeTo: ROUTES.address,
      label: t('Address'),
      key: 'address',
      icon: 'heroicons:map-pin-solid',
      subLabel: t('Organization address and location'),
    },
    {
      routeTo: 'billing',
      label: t('Billing'),
      key: 'billing',
      icon: 'heroicons:credit-card-solid',
      subLabel: t('Billing information and payment methods'),
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
      subLabel: t('Security settings and permissions'),
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
