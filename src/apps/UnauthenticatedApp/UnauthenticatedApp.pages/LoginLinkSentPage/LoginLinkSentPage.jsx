import {
  Box,
  Divider,
  Typography,
  Grid,
  Alert,
  Button,
} from '@mui/material';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  PageWithImage,
  SubmitButton,
  Copyright,
} from '@/utils';
import {
  useLoginLinkSentPage,
 } from './LoginLinkSentPage.logic';

const LoginLinkSentPage = () => {
  const {
    isMobile,
    email,
    t,
    secondsLeftToRequestANewLoginLink,
    hasRequestedLoginLinkInLastMinute,
    onResendLoginLink,
    onGoBack,
    isAppLoading,
    logoLarge,
    VITE_APP_NAME,
  } = useLoginLinkSentPage();
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
      <Box
        component="form"
        noValidate
        onSubmit={onResendLoginLink}
        sx={{
          width: '95%', // Fix IE 11 issue.
          mt: isMobile
            ? 2
            : 5,
          maxWidth: 500,
        }}
      >
        <Divider
          flexItem
          sx={{
            px: 5,
            mb: isMobile
              ? 2
              : 5,
          }}
        />
        <Typography
          component="h1"
          variant="h"
          textAlign={(
            isMobile
              ? 'center'
              : 'left'
          )}
          sx={{
            mb: 1,
          }}
        >
          {t('Login link sent by email')}
        </Typography>
        <Typography
          component="h1"
          variant="h6"
          color="primary.dark"
          textAlign={(
            isMobile
              ? 'center'
              : 'left'
          )}
        >
          {t('Click the link received by email to access your secure space')}
        </Typography>
        <Grid
          container
          spacing={0}
        >
          <Grid
            size={{
              xs: 12
            }}
          >
            <Alert
              severity="success"
              icon={false}
              sx={{
                mt: 3,
              }}
            >
              {t('We have sent a login link to')} <b>{email}</b> {t('to verify your identity.')}
              <br />
              <br />
              {t('It contains')} <b>{t('a link')}</b> {t('to login to your secure {VITE_APP_NAME} space.', { VITE_APP_NAME })}
            </Alert>
          </Grid>
          <Grid
            size={{
              xs: 12
            }}
            sx={{
              mt: 3,
            }}
          >
            <SubmitButton
              disabledOnDefault={hasRequestedLoginLinkInLastMinute}
              disabledOnSuccess={hasRequestedLoginLinkInLastMinute}
              disabledOnError={hasRequestedLoginLinkInLastMinute}
              defaultContent={(
                hasRequestedLoginLinkInLastMinute
                ? t('Didn\'t you get anything? Try again in {seconds}s', {
                  seconds: secondsLeftToRequestANewLoginLink,
                })
                : t('Resend an email')
              )}
              errorContent={t('Error')}
              defaultIcon={(
                hasRequestedLoginLinkInLastMinute
                  ? 'material-symbols:hourglass-outline-rounded'
                  : 'material-symbols:outgoing-mail-rounded'
  )}
              loading={isAppLoading}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
            }}
            sx={{
              mt: 2,
            }}
          >
            <Button
              fullWidth
              startIcon={<IconifyIcon icon="mdi:arrow-left" />}
              variant="text"
              onClick={onGoBack}
            >
              {t('Wrong email address? Start again')}
            </Button>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Box>
    </PageWithImage>
  );
};

export default LoginLinkSentPage; 