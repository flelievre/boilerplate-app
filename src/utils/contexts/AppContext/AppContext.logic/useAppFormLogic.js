const useAppContextLogic = ({
  setIsAppLoading = () => {},
  toastifySuccessMessage = () => {},
  toastifyErrorMessage = () => {},
}) => {
  const handleFormSubmission = async ({
    t = (s) => s,
    e = {
      preventDefault: () => {},
    },
    isFormInvalid = false,
    formAction = async () => {},
    errorHandler = () => {},
    successHandler = () => {},
    shouldSetAppInLoadingMode = false,
    successMessageToDisplay = '',
    isFormLoading = false,
    setIsFormLoading = () => {},
    setHasABackendError = () => {},
    showSuccessToast = true,
    showErrorToastIfInvalid = true,
  }) => {
    e.preventDefault();
    setHasABackendError(false);
    if (!isFormLoading) {
      if (isFormInvalid) {
        errorHandler();
        return {};
      } else {
        setIsFormLoading(true);
        if (shouldSetAppInLoadingMode) {
          setIsAppLoading(true);
        }
        try {
          const res = await formAction() || {};
          const {
            data,
            data: {
              message = '',
            } = {},
          } = res;
          await successHandler(data);
          if (showSuccessToast) {
            toastifySuccessMessage({
              message: t(successMessageToDisplay || message),
            });
          }
          setIsFormLoading(false);
          setIsAppLoading(false);
          return data;
        } catch (e) {
          setIsFormLoading(false);
          setIsAppLoading(false);
          await errorHandler(e.message);
          setHasABackendError(true);
          if (showErrorToastIfInvalid) {
            toastifyErrorMessage({
              message: t(e.message),
            });
          }
          return {};
        }
      }
    } else {
      return {};
    }
  };

  return {
    handleFormSubmission,
  };
};

export default useAppContextLogic;
