import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert,
  AlertTitle,
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
  useOnboardingOrganizationPage,
 } from './OnboardingOrganizationPage.logic';
 import {
   ONBOARDING_STEPS,
 } from '@/constants';

const OnboardingOrganizationPage = ({
  hasCompletedOrganizationOnboarding = false,
}) => {
  const {
    isMobile,
    onCreateOrganization,
    organizationName,
    setOrganizationName,
    employeeCount,
    setEmployeeCount,
    organizationNameErrorHelper,
    employeeCountErrorHelper,
    hasAnError,
    nbFormSubmissionCounter,
    isAppLoading,
    logoLarge,
    VITE_APP_NAME,
    t,
    EMPLOYEE_COUNT_OPTIONS,
    onGoBack,
  } = useOnboardingOrganizationPage();

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
        onSubmit={onCreateOrganization}
        sx={{
          width: '95%', // Fix IE 11 issue.
          mt: isMobile
            ? 2
            : 5,
          maxWidth: 500,
        }}
      >
        <Box
          sx={{
            width: '100%',
          }}
        >
          {hasCompletedOrganizationOnboarding
          ? (
            <Alert
              severity="warning"
            >
              <AlertTitle
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {t('You no longer belong to any organization')}
              </AlertTitle>
              {t('Create one or ask to be invited again')}
            </Alert>
          )
          : (
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
            )
        }
        </Box>
        <Typography
          component="h1"
          variant=""
          textAlign={(
            isMobile
              ? 'center'
              : 'left'
          )}
          sx={{
            mt: hasCompletedOrganizationOnboarding
              ? 2
              : 5,
          }}
        >
          {t('Set up your organization')}
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
          {t('Tell us about your company')}
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
              id="organizationName"
              label={t('Organization name')}
              name="organizationName"
              autoFocus={!isMobile}
              value={organizationName}
              onChange={({ target }) => setOrganizationName(target.value)}
              error={!!organizationNameErrorHelper}
              helperText={organizationNameErrorHelper}
            />
          </Grid>
          <Grid
            size={{
              xs: 12
            }}
          >
            <FormControl
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!!employeeCountErrorHelper}
            >
              <InputLabel id="employee-count-label">
                {t('Employee count')}
              </InputLabel>
              <Select
                labelId="employee-count-label"
                id="employeeCount"
                value={employeeCount}
                onChange={({ target }) => setEmployeeCount(target.value)}
                label={t('Employee count')}
              >
                {EMPLOYEE_COUNT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </MenuItem>
                ))}
              </Select>
              {employeeCountErrorHelper && (
                <FormHelperText>
                  {employeeCountErrorHelper}
                </FormHelperText>
              )}
            </FormControl>
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
              defaultIcon="material-symbols:business-outline-rounded"
              loading={isAppLoading}
            />
          </Grid>
        </Grid>
        {!hasCompletedOrganizationOnboarding && (
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
              onClick={onGoBack}
            >
              {t('Back')}
            </Button>
          </Grid>
        )}
        <Box mt={5}>
          <Copyright />
        </Box>
      </Box>
    </PageWithImage>
  );
};

export default OnboardingOrganizationPage; 