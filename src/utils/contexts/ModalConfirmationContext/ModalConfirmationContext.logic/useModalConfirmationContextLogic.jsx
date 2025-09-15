import {
  useState,
  useEffect,
  useContext,
} from 'react';
import useForm from '../../../hooks/useForm';
import AppContext from '../../AppContext/AppContext';
import useBoolean from '../../../hooks/useBoolean';

const useModalConfirmationContextLogic = () => {
  const [modalConfirmationConfig, setModalConfirmationConfig] = useState({});
  const [confirmationProvidedText, setConfirmationProvidedText] = useState('');
  const [isFormLoading, setIsFormLoading] = useState(false);

  const {
    t,
    handleFormSubmission,
    isMobile,
  } = useContext(AppContext);

  const {
    type = 'confirmation',
    successMessageToDisplay = '',
    contentText = '',
    successHandler = () => {},
    title = 'Are you sure?',
    confirmationText = '',
    titleIcon = '',
    submitButtonText = 'Confirm',
    confirmationLabel = '',
    formAction = () => {},
    errorHandler = () => {},
  } = modalConfirmationConfig;

  const {
    value: isShowingModal,
    setTrue: showModal,
    setFalse: hideModal,
  } = useBoolean();

  const {
    handleFormAction,
    nbFormSubmissionCounter,
    hasAnError,
    resetNbFormSubmissionCounter,
    confirmationProvidedText: confirmationProvidedTextErrorHelper,
  } = useForm({
    isFormLoading,
    setIsFormLoading,
    handleFormSubmission,
    inputsErrorsTexts: {
      confirmationProvidedText: 'Confirmation text does not match',
    },
    formAction: async () => {
      await formAction();
      hideModal();
    },
    areFormInputsInvalid: ({ confirmationProvidedText, confirmationText }) => ({
      confirmationProvidedText: confirmationProvidedText !== confirmationText,
    }),
    successMessageToDisplay: t(successMessageToDisplay),
    successHandler,
    errorHandler,
    confirmationProvidedText,
    confirmationText,
    t,
  });

  useEffect(() => {
    if (Object.keys(modalConfirmationConfig).length > 0) {
      showModal();
    } else {
      hideModal();
      resetNbFormSubmissionCounter();
    }
  }, [JSON.stringify(modalConfirmationConfig)]);

  useEffect(() => {
    if (!isShowingModal) {
      resetNbFormSubmissionCounter();
      setModalConfirmationConfig({});
      setConfirmationProvidedText('');
      setIsFormLoading(false);
    }
  }, [isShowingModal]);

  return {
    confirmationProvidedText,
    setConfirmationProvidedText,
    nbFormSubmissionCounter,
    hasAnError,
    handleFormAction,
    isFormLoading,
    setModalConfirmationConfig,
    isShowingModal,
    title,
    titleIcon,
    confirmationText,
    submitButtonText,
    hideModal,
    isMobile,
    type,
    confirmationLabel,
    confirmationProvidedTextErrorHelper,
    contentText,
  };
};

export default useModalConfirmationContextLogic;
