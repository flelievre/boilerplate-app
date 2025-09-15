import {
  useState,
  useEffect,
  useContext,
} from 'react';
import useForm from '../../../hooks/useForm';
import AppContext from '../../AppContext/AppContext';
import useBoolean from '../../../hooks/useBoolean';

const useModalCreateContextLogic = () => {
  const [formConfig, setFormConfig] = useState({});
  const [formInputs, setFormInputs] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [previousStepsValues, setPreviousStepsValues] = useState({});

  const {
    t,
    handleFormSubmission,
    isMobile,
  } = useContext(AppContext);

  const {
    steps = [],
    formAction = () => {},
    successMessageToDisplay = '',
    successHandler = () => {},
    contentText = '',
    submitButtonText = '',
    hideModalAfterAction = true,
    errorHandler = () => {},
  } = formConfig;

  const isLastStep = (
    stepIndex === (steps.length - 1)
  );
  const isFirstStep = (
    stepIndex === 0
  );

  const handleBack = () => {
    setStepIndex((prev) => prev - 1);
  };

  const {
    fields = [],
    areFormInputsInvalid = () => false,
    title = '',
    titleIcon = '',
  } = steps[stepIndex] || {};

  const {
    value: isShowingModal,
    setTrue: showModal,
    setFalse: hideModal,
  } = useBoolean();

  useEffect(() => {
    if (fields.length > 0) {
      setFormInputs(
        fields.reduce((acc, field) => {
          acc[field.name] = previousStepsValues[field.name] || field.initValue;
          return acc;
        }, {}),
      );
    } else {
      setFormInputs({});
      setPreviousStepsValues({});
    }
  }, [JSON.stringify(fields)]);

  const [isFormLoading, setIsFormLoading] = useState(false);

  const {
    handleFormAction,
    nbFormSubmissionCounter,
    hasAnError,
    resetNbFormSubmissionCounter,
    ...formInputsErrorsHelpers
  } = useForm({
    isFormLoading,
    setIsFormLoading,
    handleFormSubmission,
    formAction: async () => {
      if (isLastStep) {
        const apiResponse = await formAction({
          ...formInputs,
          ...previousStepsValues,
        });
        if (hideModalAfterAction) {
          hideModal();
        }
        return apiResponse;
      }
    },
    areFormInputsInvalid,
    inputsErrorsTexts: fields.reduce((acc, field) => {
      acc[field.name] = field.errorHelper;
      return acc;
    }, {}),
    showSuccessToast: isLastStep,
    successMessageToDisplay: t(successMessageToDisplay),
    successHandler: isLastStep
      ? successHandler
      : () => {
        setStepIndex((prev) => prev + 1);
        setPreviousStepsValues({
          ...previousStepsValues,
          ...formInputs,
        });
      },
    errorHandler,
    t,
    ...formInputs,
  });

  useEffect(() => {
    if (Object.keys(formInputs).length > 0) {
      showModal();
    } else {
      hideModal();
    }
  }, [JSON.stringify(formInputs)]);

  useEffect(() => {
    if (!isShowingModal) {
      resetNbFormSubmissionCounter();
      setFormConfig({});
      setStepIndex(0);
    }
  }, [isShowingModal]);

  const handleChange = (fieldName) => ({ target }) => {
    const {
      valueFormatter = (v) => v,
      inputType = 'TextField',
    } = fields.find((field) => field.name === fieldName);
    const value = (
      (inputType === 'Checkbox')
      || (inputType === 'Switch')
    )
      ? target.checked
      : valueFormatter(target.value);
    setFormInputs((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    setPreviousStepsValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return {
    handleChange,
    nbFormSubmissionCounter,
    hasAnError,
    handleFormAction,
    formInputsErrorsHelpers,
    isFormLoading,
    setFormConfig,
    isShowingModal,
    title,
    titleIcon,
    contentText,
    submitButtonText,
    hideModal,
    isMobile,
    fields,
    formInputs,
    handleBack,
    isFirstStep,
    isLastStep,
  };
};

export default useModalCreateContextLogic;
