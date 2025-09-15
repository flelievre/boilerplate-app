import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  PageWithImage,
  Copyright,
} from '@/utils';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  useOnboardingInvitationsPage,
 } from './OnboardingInvitationsPage.logic';
 import {
   ONBOARDING_STEPS,
 } from '@/constants';

const OnboardingInvitationsPage = () => {
  const {
    isMobile,
    t,
    logoLarge,
    VITE_APP_NAME,
    currentInvitation,
    pendingInvitations,
    isRequestLoading,
    onAcceptInvitation,
    onDeclineInvitation,
    hasCompletedOrganizationOnboarding,
  } = useOnboardingInvitationsPage();

  if (!currentInvitation) {
    return (
      <PageWithImage
        isMobile={isMobile}
      >
        <Box>
          <img
            src={logoLarge}
            alt={`${VITE_APP_NAME}-logo-small`}
            style={{
              width: 200,
            }}
          />
        </Box>
        <Box sx={{ mt: 5 }}>
          <CircularProgress />
        </Box>
      </PageWithImage>
    );
  }

  return (
    <PageWithImage
      isMobile={isMobile}
    >
      <Box>
        <img
          src={logoLarge}
          alt={`${VITE_APP_NAME}-logo-small`}
          style={{
            width: isMobile
              ? 100
              : 200,
          }}
        />
      </Box>
      <Box
        sx={{
          width: '95%', // Fix IE 11 issue.
          mt: isMobile
            ? 2
            : 5,
          maxWidth: 500,
        }}
      >
        {!hasCompletedOrganizationOnboarding && (
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Stepper
              activeStep={1}
              alternativeLabel
            >
              {ONBOARDING_STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel>
                    {t(label)}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}
        <Typography
          component="h1"
          variant=""
          textAlign={(
            isMobile
              ? 'center'
              : 'left'
          )}
          sx={{
            mt: 5,
          }}
        >
          {pendingInvitations.length > 1
            ? t('Collaborate with your teams')
            : t('Collaborate with your team')
          }
        </Typography>

        <Box sx={{ mt: 3, mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <IconifyIcon
              icon="mdi:information-outline"
              style={{
                marginRight: 5,
                verticalAlign: 'middle',
              }}
            />
            {pendingInvitations.length} {pendingInvitations.length > 1
              ? t('invitations pending')
              : t('invitation pending')
            }
          </Typography>
        </Box>
        <Typography
          component="h1"
          variant="h6"
          color="primary.dark"
          textAlign="left"
        >
          <b>{currentInvitation.invitedByDisplayName}</b> {t('from')} <b>{currentInvitation.organizationName}</b> {t('invited you to work together')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2, }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<IconifyIcon icon="mdi:close" />}
            onClick={onDeclineInvitation}
            disabled={isRequestLoading}
            sx={{ minWidth: 120 }}
          >
            {t('Decline')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconifyIcon icon="mdi:check" />}
            onClick={onAcceptInvitation}
            disabled={isRequestLoading}
            sx={{ minWidth: 120 }}
          >
            {isRequestLoading ? (
              <CircularProgress size={20} />
            ) : (
              t('Accept')
            )}
          </Button>
        </Box>

        <Box mt={5}>
          <Copyright />
        </Box>
      </Box>
    </PageWithImage>
  );
};

export default OnboardingInvitationsPage; 