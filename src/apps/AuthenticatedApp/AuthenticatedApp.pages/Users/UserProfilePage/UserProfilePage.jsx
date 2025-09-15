import {
  Box,
  Paper,
  Stack,
  ListItemText,
  Grid,
  Typography,
} from '@mui/material';
import {
  TabPanel,
  TabsMenu,
  AvatarInput,
} from '@/utils';
import {
  useUserProfilePage,
} from './UserProfilePage.logic';
import {
  UserInfoPanel,
} from './UserProfilePage.components';

const UserProfilePage = () => {
  const {
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
  } = useUserProfilePage();

  return (
    <Grid container spacing={3} sx={{ pt: 2 }}>
      <Grid size={12}>
          <Paper
            sx={{
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              height: '220px',
              transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              zIndex: 0,
              marginTop: 2,
            }}
          >
            <Box
              sx={{
                backgroundAttachment: 'scroll, scroll',
                backgroundImage: 'linear-gradient(rgba(1, 16, 97, 0.8), rgba(255, 255, 255, 0.1)), url("https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg")',
                backgroundOrigin: 'padding-box, padding-box',
                backgroundClip: 'border-box, border-box',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                height: '100%',
                borderRadius: 3,
              }}
            >
              <Stack
                direction={isMobile ? 'column' : 'row'}
                spacing={isMobile ? 1 : 2}
                sx={{
                  bottom: isMobile ? 'auto' : 20,
                  left: isMobile ? 'auto' : 20,
                  position: 'absolute',
                  width: isMobile ? '100%' : 'auto',
                  alignItems: isMobile ? 'center' : 'normal',
                  paddingTop: isMobile ? 1 : 0,
                }}
              >
                <AvatarInput
                  isMobile={isMobile}
                  t={t}
                  sx={{
                    zIndex: 1,
                  }}
                  avatarUrl={avatarUrl}
                  avatarAlt={`${firstName} ${lastName}'s avatar`}
                  disabled={!userToEditIsAuthUser}
                  onClick={() => {}}
                />
                <ListItemText
                  primary={firstName}
                  secondary={lastName}
                  primaryTypographyProps={{
                    marginTop: isMobile ? 0 : 1,
                    fontSize: isMobile ? '1.2em' : '1.5em',
                    textAlign: isMobile ? 'center' : 'left',
                    color: 'primary.dark',
                  }}
                  secondaryTypographyProps={{
                    opacity: 0.48,
                    fontSize: isMobile ? '0.9em' : '1em',
                    textAlign: isMobile ? 'center' : 'left',
                    color: 'primary',
                  }}
                />
              </Stack>
            </Box>
            <TabsMenu
              activeTabIndex={activeTabIndex}
              isMobileOrTablet={isMobileOrTablet}
              tabInfos={tabInfos}
              tabsUriBaseRoute={tabsUriBaseRoute}
              disableRipple
              t={t}
              sxTabs={{
                position: 'absolute',
                bottom: 0,
                pl: isMobile ? 0 : 17.5,
                width: '100%',
                backgroundColor: 'inherit',
              }}
            />
          </Paper>
        </Grid>
      <Grid size={12}>
        <UserInfoPanel
          activeTabIndex={activeTabIndex}
        />
        <TabPanel value={activeTabIndex} index={1}>
          <Typography>
            {t('Settings')}
          </Typography>
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default UserProfilePage;
