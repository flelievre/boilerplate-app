import {
  useState,
} from 'react';
import {
  generateInputsErrorsTexts,
  isFormInvalid,
} from '../functions';
import useCounter from './useCounter';

const useForm = ({
  setIsFormLoading = () => {},
  isFormLoading = false,
  handleFormSubmission = () => {},
  formAction = () => {},
  areFormInputsInvalid = () => true,
  inputsErrorsTexts = {},
  t = (s) => s,
  errorHandler = () => {},
  successHandler = () => {},
  shouldSetAppInLoadingMode = false,
  successMessageToDisplay = '',
  showSuccessToast = true,
  showErrorToastIfInvalid = true,
  ...formInputs
}) => {
  const [hasABackendError, setHasABackendError] = useState(false);
  const {
    counterIsNotNull: shouldShowErrors,
    incrementCounter: incrementNbFormSubmissionCounter,
    counter: nbFormSubmissionCounter,
    resetCounter: resetNbFormSubmissionCounter,
  } = useCounter();

  const {
    hasAnError,
    ...inputErrorHelpers
  } = generateInputsErrorsTexts({
    areFormInputsInvalid,
    inputsErrorsTexts,
    isShowingErrors: shouldShowErrors,
    t,
    ...formInputs,
  });

  const handleFormAction = (e) => handleFormSubmission({
    e,
    formAction,
    t,
    isFormInvalid: isFormInvalid({
      areFormInputsInvalid,
      ...formInputs,
    }),
    showErrorToastIfInvalid,
    shouldSetAppInLoadingMode,
    incrementNbFormSubmissionCounter,
    successMessageToDisplay,
    showSuccessToast,
    setHasABackendError,
    errorHandler: async (e) => {
      await errorHandler(e);
      incrementNbFormSubmissionCounter();
    },
    successHandler: async (data) => {
      await successHandler(data);
      resetNbFormSubmissionCounter();
    },
    setIsFormLoading,
    isFormLoading,
  });

  return {
    handleFormAction,
    nbFormSubmissionCounter,
    hasAnError: hasAnError || hasABackendError,
    resetNbFormSubmissionCounter,
    ...inputErrorHelpers,
  };
};

export default useForm;
