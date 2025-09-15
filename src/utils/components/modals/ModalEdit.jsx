import {
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';
import Modal from './Modal';

const ModalEdit = ({
  title = '',
  titleIcon = '',
  isShowingModal = false,
  hideModal = () => {},
  handleChange = () => {},
  contentText = '',
  isLoading = false,
  isMobile = false,
  nbFormSubmissionCounter = false,
  hasAnError = false,
  handleSubmit = () => {},
  submitButtonText = 'Update',
  formInputs = [],
  formInputsErrorsHelpers = {},
  t = (s) => s,
}) => isShowingModal && (
  <Modal
    title={t(title)}
    titleIcon={titleIcon}
    isShowingModal={isShowingModal}
    hideModal={hideModal}
    contentText={contentText}
    titleSx={{
      fontWeight: 400,
    }}
    contentTextSx={{
      mt: 3,
      mb: 2,
    }}
    isLoading={isLoading}
    isMobile={isMobile}
    nbFormSubmissionCounter={nbFormSubmissionCounter}
    hasAnError={hasAnError}
    handleSubmit={handleSubmit}
    submitButtonText={submitButtonText}
    t={t}
  >
    {formInputs.map((input) => {
      if (input.inputType === 'TextField') {
        return (
          <TextField
            key={input.name}
            name={input.name}
            fullWidth
            id={input.name}
            label={input.label}
            autoFocus={!isMobile}
            multiline={!!input.multiline}
            rows={input.multiline}
            sx={{ mt: 1 }}
            value={input.value || ''}
            onChange={handleChange(input.name)}
            error={!!formInputsErrorsHelpers[input.name]}
            helperText={formInputsErrorsHelpers[input.name]}
          />
        );
      }

      if (input.inputType === 'Checkbox') {
        return (
          <FormControlLabel
            key={input.name}
            control={(
              <Switch
                checked={input.value}
                onChange={handleChange(input.name)}
              />
            )}
            label={input.label}
          />
        );
      }

      return null;
    })}
  </Modal>
);

export default ModalEdit;
