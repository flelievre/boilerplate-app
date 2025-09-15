import {
  useTeamPage,
 } from './TeamPage.logic';
import {
  TabsMenu,
} from '@/utils';
import {
  Typography,
} from '@mui/material';
import {
  MembersTab,
  InvitationsTab,
} from './TeamPage.components';

const TeamPage = () => {
  const {
    handleInviteUserButtonClick,
    t,
    tabsUriBaseRoute,
    activeTabIndex,
    tabInfos,
    isMobileOrTablet,
    inviteUser,
    resendInvitation,
    h1Title,
    h2Title,
  } = useTeamPage();

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
        <MembersTab
          activeTabIndex={activeTabIndex}
          handleInviteUserButtonClick={handleInviteUserButtonClick}
        />
      )}
      {activeTabIndex === 1 && (
        <InvitationsTab
          activeTabIndex={activeTabIndex}
          handleInviteUserButtonClick={handleInviteUserButtonClick}
          inviteUser={inviteUser}
          resendInvitation={resendInvitation}
        />
      )}
    </>
  );
};

export default TeamPage; 