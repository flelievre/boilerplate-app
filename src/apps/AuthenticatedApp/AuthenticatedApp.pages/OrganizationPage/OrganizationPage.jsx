import {
  useOrganizationPage,
} from './OrganizationPage.logic';
import {
  TabsMenu,
} from '@/utils';
import {
  Typography,
} from '@mui/material';
import {
  InformationTab,
  AddressTab,
  BillingTab,
  InvoicesTab,
  SecurityTab,
} from './OrganizationPage.components';

const OrganizationPage = () => {
  const {
    t,
    tabsUriBaseRoute,
    activeTabIndex,
    tabInfos,
    isMobileOrTablet,
    h1Title,
    h2Title,
  } = useOrganizationPage();

  return (
    <>
      <Typography
        component="h1"
        variant=""
      >
        {h1Title}
      </Typography>
      <Typography
        component="h2"
        variant="body1"
        color="primary.dark"
      >
        {h2Title}
      </Typography>
      <TabsMenu
        activeTabIndex={activeTabIndex}
        isMobileOrTablet={isMobileOrTablet}
        tabInfos={tabInfos}
        tabsUriBaseRoute={tabsUriBaseRoute}
        disableRipple
        t={t}
        sxTabs={{
          backgroundColor: 'inherit',
        }}
        sxBox={{
          boxShadow: 'none',
          mb: 2,
        }}
      />
      {activeTabIndex === 0 && (
        <InformationTab />
      )}
      {activeTabIndex === 1 && (
        <AddressTab />
      )}
      {activeTabIndex === 2 && (
        <BillingTab />
      )}
      {activeTabIndex === 3 && (
        <InvoicesTab />
      )}
      {activeTabIndex === 4 && (
        <SecurityTab />
      )}
    </>
  );
};

export default OrganizationPage;
