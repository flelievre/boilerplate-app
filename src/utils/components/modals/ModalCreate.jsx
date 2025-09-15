import {
  TextField,
  FormControlLabel,
  Switch,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import Modal from './Modal';

const ModalCreate = ({
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
  handleBack = () => {},
  submitButtonText = 'Create',
  formInputs = [],
  formInputsErrorsHelpers = {},
  t = (s) => s,
  fields = [],
  isFirstStep = true,
  isLastStep = false,
}) => isShowingModal && (
  <Modal
    title={t(title)}
    titleIcon={titleIcon}
    isShowingModal={isShowingModal}
    hideModal={hideModal}
    handleBack={handleBack}
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
    isFirstStep={isFirstStep}
    isLastStep={isLastStep}
    t={t}
  >
    {fields.map((input) => {
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
            value={formInputs[input.name] || ''}
            onChange={handleChange(input.name)}
            error={!!formInputsErrorsHelpers[input.name]}
            helperText={formInputsErrorsHelpers[input.name]}
          />
        );
      }

      if (input.inputType === 'Switch') {
        return (
          <FormControlLabel
            key={input.name}
            control={(
              <Switch
                checked={formInputs[input.name] || false}
                onChange={handleChange(input.name)}
              />
            )}
            disabled={input.disabled}
            label={(
              formInputs[input.name]
                ? input.labelIfAuthorized || input.label
                : input.labelIfUnauthorized || input.label
            )}
          />
        );
      }

      if (input.inputType === 'Checkbox') {
        return (
          <FormControlLabel
            key={input.name}
            sx={{
              display: 'block',
            }}
            control={(
              <Checkbox
                checked={formInputs[input.name] || false}
                onChange={handleChange(input.name)}
              />
            )}
            disabled={input.disabled}
            label={input.label}
          />
        );
      }

      if (input.inputType === 'Select') {
        return (
          <FormControl
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={!!formInputsErrorsHelpers[input.name]}
          >
            <InputLabel id={input.name}>
              {input.label}
            </InputLabel>
            <Select
              labelId={input.name}
              id={input.name}
              value={formInputs[input.name] || ''}
              onChange={handleChange(input.name)}
              label={input.label}
            >
              {input.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.label)}
                </MenuItem>
              ))}
            </Select>
            {formInputsErrorsHelpers[input.name] && (
              <FormHelperText>
                {formInputsErrorsHelpers[input.name]}
              </FormHelperText>
            )}
          </FormControl>
        );
      }

      return null;
    })}
  </Modal>
);

export default ModalCreate;
