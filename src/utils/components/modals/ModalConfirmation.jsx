import {
  TextField,
  Typography,
  DialogContentText,
} from '@mui/material';
import Modal from './Modal';
import { conforms } from 'lodash';

const ModalConfirmation = ({
  title = 'Are you sure?',
  titleIcon = 'ic:baseline-warning',
  isShowingModal = false,
  hideModal = () => {},
  setConfirmationProvidedText = () => {},
  confirmationProvidedText = '',
  confirmationText = '',
  isLoading = false,
  isMobile = false,
  nbFormSubmissionCounter = false,
  hasAnError = false,
  handleSubmit = () => {},
  submitButtonText = '',
  confirmationProvidedTextErrorHelper = '',
  confirmationLabel = '',
  contentText = '',
  t = (s) => s,
  type = 'confirmation',
}) => {
  const isDeletion = type === 'deletion';
  const isConfirmation = type === 'confirmation';

  // submit button color
  const primaryOrWariningButtonColor = isConfirmation
    ? 'primary'
    : 'warning';

  const buttonColor = isDeletion
    ? 'error'
    : primaryOrWariningButtonColor;

  // submit button color
  const primaryOrWariningTextColor = isConfirmation
    ? 'primary.dark'
    : 'warning.main';

  const textColor = isDeletion
    ? 'error.main'
    : primaryOrWariningTextColor;

  // submit button text
  const primaryOrWariningDefaultButtonText = isConfirmation
    ? t('Confirm')
    : t('Delete');

  const defaultButtonText = isDeletion
    ? t('Delete')
    : primaryOrWariningDefaultButtonText;

  // confirmation label
  const defaultConfirmationLabel = isDeletion
    ? t('Confirm deletion by typing:')
    : t('Confirm by typing:');

  return (
    isShowingModal
    && (
      <Modal
        title={t(title)}
        titleIcon={titleIcon}
        isShowingModal={isShowingModal}
        hideModal={hideModal}
        contentText={(
          <>
            {contentText && (
              <DialogContentText
                sx={{
                  mb: confirmationText
                    ? 2
                    : 0,
                }}
              >
                {contentText}         
              </DialogContentText>
            )}
            {(
              confirmationText
              && (
                <>
                  {t(confirmationLabel || defaultConfirmationLabel)}
                  <Typography
                    sx={{
                      color: textColor,
                      fontWeight: 'bold',
                    }}
                    variant="body"
                    component="span"
                  >
                    {` ${confirmationText}`}
                  </Typography>
                </>
              )
            )}
          </>
        )}
        titleSx={{
          fontWeight: 400,
          color: textColor,
        }}
        contentTextSx={{
          mb: 2,
        }}
        isLoading={isLoading}
        isMobile={isMobile}
        nbFormSubmissionCounter={nbFormSubmissionCounter}
        hasAnError={hasAnError}
        handleSubmit={handleSubmit}
        defaultSubmitButtonColor={buttonColor}
        submitButtonText={t(submitButtonText || defaultButtonText)}
        t={t}
      >
        {(confirmationText && (
          <TextField
            name="confirmation-text"
            fullWidth
            id="confirmation-text"
            label=""
            autoFocus={!isMobile}
            placeholder={confirmationText}
            sx={{
              mt: 1,
              '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                borderColor: textColor,
              },
            }}
            value={confirmationProvidedText}
            onChange={({ target }) => setConfirmationProvidedText(target.value)}
            variant="outlined"
            error={hasAnError}
              helperText={t(confirmationProvidedTextErrorHelper)}
            />
        ))}
      </Modal>
    )
  );
};

export default ModalConfirmation;
