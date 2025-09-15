import {
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import {
  TabPanel,
  EditableText,
} from '@/utils';
import {
  useUserInfoPanel,
} from './UserInfoPanel.logic';

const UserInfoPanel = ({
  activeTabIndex,
}) => {
  const {
    t,
    isFormLoading,
    userToEditIsAuthUser,
    firstName,
    lastName,
    setObjToEditInfo,
    isMobile,
  } = useUserInfoPanel();

  return (
    <TabPanel value={activeTabIndex} index={0}>
      <Typography
        component="h2"
        variant="subtitle1"
        color="secondary"
      >
        {t('Profile')}
      </Typography>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Stack spacing={2}>
          <EditableText
            isLoading={isFormLoading}
            canEdit={userToEditIsAuthUser}
            label={t('First name')}
            value={firstName}
            editIconOnClick={() => setObjToEditInfo({
              propertiesToEdit: ['firstName'],
              objToUpdateIndex: 0,
            })}
            aria-label="Edit first name"
            skeletonWidth={140}
            isMobile={isMobile}
            t={t}
          />
          <EditableText
            isLoading={isFormLoading}
            canEdit={userToEditIsAuthUser}
            label={t('Last name')}
            value={lastName}
            editIconOnClick={() => setObjToEditInfo({
              propertiesToEdit: ['lastName'],
              objToUpdateIndex: 0,
            })}
            aria-label="Edit last name"
            skeletonWidth={140}
            isMobile={isMobile}
            t={t}
          />
        </Stack>
      </Paper>
    </TabPanel>
  );
};

export default UserInfoPanel;