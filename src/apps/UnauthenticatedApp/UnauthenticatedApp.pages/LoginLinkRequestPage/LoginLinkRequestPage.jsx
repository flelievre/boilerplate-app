import {
  Box,
  Divider,
  Typography,
  Grid,
  TextField,
  Alert,
} from '@mui/material';
import {
  PageWithImage,
  SubmitButton,
  Copyright,
} from '@/utils';
import {
  useLoginLinkRequestPage,
 } from './LoginLinkRequestPage.logic';

const LoginLinkRequestPage = () => {
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
  } = useLoginLinkRequestPage();
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
        onSubmit={onLoginLinkRequest}
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
          variant=""
          textAlign={(
            isMobile
              ? 'center'
              : 'left'
          )}
          sx={{
            mb: 1,
          }}
        >
          {t('Access your secure space')}
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
          {t('Login or sign up')}
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
          <Grid
            size={{
              xs: 12
            }}
          >
            <SubmitButton
              shouldShowErrorState={hasAnError}
              nbClick={nbFormSubmissionCounter}
              sx={{
                mt: 2,
              }}
              disabledOnDefault={hasRequestedLoginLinkInLastMinute}
              disabledOnSuccess={hasRequestedLoginLinkInLastMinute}
              disabledOnError={hasRequestedLoginLinkInLastMinute}
              defaultContent={(
                hasRequestedLoginLinkInLastMinute
                ? buttonTimedoutText
                : t('Continue')
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
          {hasRequestedLoginLinkInLastMinute && storedEmail && (
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
            )}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Box>
    </PageWithImage>
  );
};

export default LoginLinkRequestPage;


