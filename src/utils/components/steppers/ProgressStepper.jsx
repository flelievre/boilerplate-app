import {
  MobileStepper,
  Button,
  Icon as MaterialIcon,
  Typography,
  Grid,
} from '@mui/material';
import {
  Icon,
} from '@iconify/react';

const ProgressStepper = ({
  steps = [],
  activeStepIndex = 0,
  progressLabel = '',
  shouldBeDisabledOnLastStep = false,
  isFirstStep = true,
  isLastStep = false,
  backButtonText = 'Back',
  backFirstButtonText = 'Back',
  nextButtonText = 'Next',
  nextLastButtonText = 'Create',
  handleNext = () => {},
  handleBack = () => {},
  showNextButton = true,
  showBackButton = true,
  t = (s) => s,
  Subtitle = undefined,
}) => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    spacing={1}
    sx={{
      pt: 1,
    }}
  >
    <Grid
      item
      xs={12}
    >
      <Typography
        variant="h5"
        textAlign="center"
        color="neutral.main"
        sx={{
          width: '100%',
        }}
      >
        {t(progressLabel, { step: activeStepIndex + 1, nbSteps: steps.length })}
      </Typography>
      <MobileStepper
        variant="progress"
        steps={steps.length}
        position="static"
        activeStep={activeStepIndex}
        sx={{
          flexGrow: 1,
          backgroundColor: 'transparent',
        }}
        nextButton={(
          showNextButton
            ? (
              <Button
                size="small"
                onClick={handleNext}
                disabled={shouldBeDisabledOnLastStep && isLastStep}
              >
                {(isLastStep
                  ? t(nextLastButtonText)
                  : t(nextButtonText)
                )}
                <Icon icon="ic:baseline-keyboard-arrow-right" />
              </Button>
            )
            : <MaterialIcon />
        )}
        backButton={(
          showBackButton
            ? (
              <Button
                size="small"
                onClick={handleBack}
                disabled={isFirstStep}
              >
                <Icon icon="ic:baseline-keyboard-arrow-left" />
                {(isFirstStep
                  ? t(backFirstButtonText)
                  : t(backButtonText)
                )}
              </Button>
            )
            : <MaterialIcon />
        )}
      />
    </Grid>
    <Grid
      item
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      {Subtitle}
    </Grid>
  </Grid>
);

export default ProgressStepper;
