import React, {
  forwardRef,
} from 'react';
import useKeypress from 'react-use-keypress';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Fade,
  Box,
  IconButton,
  LinearProgress,
  Button,
} from '@mui/material';
import ProgressStepper from '../steppers/ProgressStepper';
import SubmitButton from '../buttons/SubmitButton';

const Transition = forwardRef((
  props,
  ref,
) => (
  <Slide
    direction="left"
    ref={ref}
    // eslint-disable-next-line
    {...props}
  />
));

const Modal = ({
  title = '',
  titleIcon = '',
  defaultIcon = null,
  titleSx = {},
  isShowingModal = false,
  fullScreen = false,
  hideModal = () => {},
  children = <></>,
  transitionDirection = '',
  isLoading = false,
  isMobile = false,
  nbFormSubmissionCounter = false,
  hasSubmitButton = true,
  hasAnError = false,
  handleSubmit = () => {},
  t = (s) => s,
  updateOnEnterKeyPress = true,
  closeOnEscapeKeyPress = true,
  defaultSubmitButtonColor = 'primary',
  contentText = '',
  cancelButtonText = 'Cancel',
  submitButtonText = 'Ok',
  submitButtonNextText = 'Continue',
  contentTextSx = {},
  hasCancelButton = true,
  // multi steps management
  steps = [],
  activeStepIndex = 0,
  isFirstStep = true,
  isLastStep = true,
  handleBack = () => {},
  progressLabel = '',
  slideTrigger = false,
  progressAtBottom = true,
  direction = '',
  oppositeDirection = '',
  Subtitle = undefined,
} = {}) => {
  const hideModalIfNotLoading = isLoading
    ? () => {}
    : hideModal;

  useKeypress('Enter', () => {
    if (updateOnEnterKeyPress && isShowingModal) {
      handleSubmit();
    }
  });

  useKeypress('Escape', () => {
    if (closeOnEscapeKeyPress && isShowingModal) {
      if (isFirstStep) {
        hideModalIfNotLoading();
      } else {
        handleBack();
      }
    }
  });

  return (
    <Dialog
      open={isShowingModal}
      onClose={hideModalIfNotLoading}
      fullScreen={fullScreen}
      fullWidth
      TransitionComponent={(
        (transitionDirection !== '')
          ? Transition
          : undefined
      )}
      PaperProps={{
        sx: {
          borderRadius: 6,
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: isMobile
              ? '1.2rem'
              : '1rem',
            ...titleSx,
          }}
        >
          <Box>
            {titleIcon && (
              <IconifyIcon
                icon={titleIcon}
                style={{
                  verticalAlign: 'middle',
                  marginRight: 5,
                }}
              />
            )}
            {t(title)}
          </Box>
          <IconButton
            variant="contained"
            size="small"
            disabled={false}
            onClick={hideModalIfNotLoading}
          >
            <IconifyIcon
              icon="material-symbols:close"
              height={24}
            />
          </IconButton>
        </DialogTitle>
      )}
      {(steps.length > 0) && !progressAtBottom && (
        <ProgressStepper
          steps={steps}
          activeStepIndex={activeStepIndex}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          backButtonText={t('Back')}
          backFirstButtonText={t('Back')}
          nextButtonText={t('Next')}
          nextLastButtonText={t('Create')}
          handleNext={handleSubmit}
          handleBack={handleBack}
          progressLabel={progressLabel}
          showBackButton={false}
          showNextButton={false}
          Subtitle={Subtitle}
          t={t}
        />
      )}
      {(slideTrigger
        ? (
          <Slide
            direction={(
              slideTrigger
                ? direction
                : oppositeDirection
            )}
            in={slideTrigger}
            timeout={{
              enter: 300,
              exit: 100,
            }}
          >
            <Fade
              in={slideTrigger}
              timeout={{
                enter: 300,
                exit: 100,
              }}
            >
              <DialogContent>
                {contentText && (
                  <DialogContentText sx={{ ...contentTextSx }}>
                    {contentText}
                  </DialogContentText>
                )}
                {children}
              </DialogContent>
            </Fade>
          </Slide>
        ) : (
          <DialogContent>
            {contentText && (
              <DialogContentText
                sx={{
                  fontSize: isMobile
                    ? '0.9rem'
                    : '1rem',
                  ...contentTextSx,
                }}
              >
                {contentText}
              </DialogContentText>
            )}
            {children}
          </DialogContent>
        )
      )}
      {(steps.length > 0) && progressAtBottom && (
        <Box
          sx={{
            width: '100%',
          }}
        >
          <LinearProgress
            variant="determinate"
            value={(activeStepIndex / (steps.length - 1)) * 100}
          />
        </Box>
      )}
      <DialogActions
        sx={{
          padding: fullScreen
            ? 4
            : 2,
          justifyContent: 'space-between',

        }}
      >
        {hasCancelButton && (
          <Button
            onClick={(isFirstStep
              ? hideModalIfNotLoading
              : handleBack
            )}
            color="primary"
            variant="text"
            loading={isLoading}
            size={isMobile ? 'medium' : 'large'}
            startIcon={(
              <IconifyIcon icon="material-symbols:chevron-left" />
            )}
          >
            {(isFirstStep
              ? t(cancelButtonText)
              : t('Back')
            )}
          </Button>
        )}
        {hasSubmitButton && (
          <SubmitButton
            fullWidth={false}
            onClick={handleSubmit}
            shouldShowErrorState={hasAnError}
            nbClick={nbFormSubmissionCounter}
            defaultContent={(isLastStep
              ? t(submitButtonText)
              : t(submitButtonNextText)
            )}
            errorContent={t('Error')}
            defaultIcon={(isLastStep
              ? defaultIcon
              : 'material-symbols:chevron-right'
            )}
            defaultColor={defaultSubmitButtonColor}
            successColor="success"
            errorColor="error"
            size={isMobile ? 'medium' : 'large'}
            loading={isLoading}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
