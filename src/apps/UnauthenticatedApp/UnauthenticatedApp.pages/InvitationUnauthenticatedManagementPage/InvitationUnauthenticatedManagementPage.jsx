import {
  Box,
  Divider,
  Typography,
  Grid,
  TextField,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import {
  PageWithImage,
  SubmitButton,
  Copyright,
} from '@/utils';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  useInvitationUnauthenticatedManagementPage,
} from './InvitationUnauthenticatedManagementPage.logic';

const InvitationUnauthenticatedManagementPage = () => {
  const {
    isMobile,
    onLoginLinkRequest,
    email,
    setEmail,
    emailErrorHelper,
    hasAnError,
    nbFormSubmissionCounter,
    isAppLoading,
    logoLarge,
    VITE_APP_NAME,
    t,
    buttonTimedoutText,
    storedEmail,
    hasRequestedLoginLinkInLastMinute,
    invitation,
    invitationLoading,
    invitationError,
    onGoBack,
    userExists,
  } = useInvitationUnauthenticatedManagementPage();

  if (invitationLoading) {
    return (
      <PageWithImage isMobile={isMobile}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      </PageWithImage>
    );
  }

  if (invitationError || !invitation) {
    return (
      <PageWithImage isMobile={isMobile}>
        <Box>
          <img
            src={logoLarge}
            alt={`${VITE_APP_NAME}-logo-small`}
            style={{
              width: 200,
            }}
          />
        </Box>
        <Box
          sx={{
            width: '95%',
            mt: isMobile ? 2 : 5,
            maxWidth: 500,
          }}
        >
          <Divider
            flexItem
            sx={{
              px: 5,
              mb: isMobile ? 2 : 5,
            }}
          />
          
          {/* Invitation Information */}
          <Typography
            component="h1"
            variant=""
            textAlign={isMobile ? 'center' : 'left'}
            sx={{
              mb: 2,
            }}
          >
            {t('Invitation has expired or is invalid')}
          </Typography>
          
          <Typography
            component="h2"
            variant="h6"
            color="secondary"
            textAlign={isMobile ? 'center' : 'left'}
            sx={{
              mb: 3,
            }}
          >
            {t('Please ask your team to send you a new invitation')}
          </Typography>
          <SubmitButton
            sx={{
              mt: 2,
            }}
            defaultContent={t('Request a new invitation link')}
            defaultIcon="material-symbols:outgoing-mail-rounded"
            onClick={() => {
              const subject = encodeURIComponent(t('Expired Invitation to {VITE_APP_NAME}', {
                VITE_APP_NAME,
              }));
              const body = encodeURIComponent(
                t('Hi,\n\nThanks a lot for the invitation to join {VITE_APP_NAME}.\nI tried to sign up, but it looks like the invitation has expired.\n\nCan you invite me again?\n\nAppreciate it!\n\nBest,', {
                  VITE_APP_NAME,
                })
              );
              const email = '';
              window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
            }}
          />
        </Box>
        <Grid
          container
          spacing={0}
          sx={{ mt: 3 }}
        >
          <Grid
            size={{ xs: 12 }}
            sx={{ mt: 2 }}
          >
            <Button
              fullWidth
              startIcon={<IconifyIcon icon="mdi:arrow-left" />}
              variant="text"
              onClick={onGoBack}
            >
              {t('Go back home')}
            </Button>
          </Grid>
        </Grid>
      </PageWithImage>
    );
  }

  return (
    <PageWithImage isMobile={isMobile}>
      <Box>
        <img
          src={logoLarge}
          alt={`${VITE_APP_NAME}-logo-small`}
          style={{
            width: 200,
          }}
        />
      </Box>
      <Box
        component="form"
        noValidate
        onSubmit={onLoginLinkRequest}
        sx={{
          width: '95%',
          mt: isMobile ? 2 : 5,
          maxWidth: 500,
        }}
      >
        <Divider
          flexItem
          sx={{
            px: 5,
            mb: isMobile ? 2 : 5,
          }}
        />
        
        {/* Invitation Information */}
        <Typography
          component="h2"
          variant="h"
          textAlign={isMobile ? 'center' : 'left'}
          sx={{
            mb: 2,
          }}
        >
          {t('{invitedByDisplayName} from {organizationName} invites you to work together', {
            invitedByDisplayName: invitation.invitedByDisplayName,
            organizationName: invitation.organizationName,
          })}
        </Typography>
        
        <Typography
          component="h2"
          variant="h6"
          color="primary.dark"
          textAlign={isMobile ? 'center' : 'left'}
          sx={{
            mb: 3,
          }}
        >
          {(
            userExists
              ? t('Please log in to accept the invitation')
              : t('Create an account to accept the invitation')
          )}
        </Typography>

        <Grid container spacing={0}>
          <Grid size={{ xs: 12 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('Email address')}
              name="email"
              autoFocus={!isMobile}
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              error={!!emailErrorHelper}
              helperText={emailErrorHelper}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <SubmitButton
              shouldShowErrorState={hasAnError}
              nbClick={nbFormSubmissionCounter}
              sx={{
                mt: 2,
              }}
              disabledOnDefault={hasRequestedLoginLinkInLastMinute}
              disabledOnSuccess={hasRequestedLoginLinkInLastMinute}
              disabledOnError={hasRequestedLoginLinkInLastMinute}
              defaultContent={
                hasRequestedLoginLinkInLastMinute
                  ? buttonTimedoutText
                  : t('Continue')
              }
              errorContent={t('Error')}
              defaultIcon={
                hasRequestedLoginLinkInLastMinute
                  ? 'material-symbols:hourglass-outline-rounded'
                  : 'material-symbols:outgoing-mail-rounded'
              }
              loading={isAppLoading}
            />
          </Grid>
          {hasRequestedLoginLinkInLastMinute && storedEmail && (
            <Grid size={{ xs: 12 }}>
              <Alert
                severity="success"
                icon={false}
                sx={{
                  mt: 3,
                }}
              >
                {t('We have sent a login link to')} <b>{email}</b>{' '}
                {t('to verify your identity.')}
                <br />
                <br />
                {t('It contains')} <b>{t('a link')}</b>{' '}
                {t('to login to your secure {VITE_APP_NAME} space.', {
                  VITE_APP_NAME,
                })}
              </Alert>
            </Grid>
          )}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Box>
    </PageWithImage>
  );
};

export default InvitationUnauthenticatedManagementPage; 