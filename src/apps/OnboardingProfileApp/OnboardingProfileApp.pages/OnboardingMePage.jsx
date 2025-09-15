import {
  Box,
  Typography,
  Grid,
  TextField,
  Stepper,
  Step,
  StepLabel,
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
  useOnboardingMePage,
 } from './OnboardingMePage.logic';
import {
  ONBOARDING_STEPS,
} from '@/constants';

const OnboardingMePage = () => {
  const {
    isMobile,
    onCompleteProfile,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    firstNameErrorHelper,
    lastNameErrorHelper,
    hasAnError,
    nbFormSubmissionCounter,
    isAppLoading,
    logoLarge,
    VITE_APP_NAME,
    t,
    signOut,
  } = useOnboardingMePage();

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
        onSubmit={onCompleteProfile}
        sx={{
          width: '95%', // Fix IE 11 issue.
          mt: isMobile
            ? 2
            : 5,
          maxWidth: 500,
        }}
      >
        {ONBOARDING_STEPS.length > 0 && (
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Stepper
              activeStep={0}
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
          {t('Tell us about yourself')}
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
          {t('Configure your profile')}
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
              id="firstName"
              label={t('First name')}
              name="firstName"
              autoFocus={!isMobile}
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
              error={!!firstNameErrorHelper}
              helperText={firstNameErrorHelper}
            />
          </Grid>
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
              id="lastName"
              label={t('Last name')}
              name="lastName"
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
              error={!!lastNameErrorHelper}
              helperText={lastNameErrorHelper}
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
              defaultContent={t('Continue')}
              errorContent={t('Error')}
              defaultIcon="fluent:arrow-right-12-filled"
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
              startIcon={<IconifyIcon icon="mdi:arrow-left" />}
              variant="text"
              onClick={signOut}
            >
              {t('Sign out')}
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

export default OnboardingMePage; 