import {
  useCallback,
} from 'react';
import {
  toast,
} from 'react-toastify';
import {
  LOADING_TOAST_CONF,
  SHARED_TOAST_CONF,
} from '@/config';
import {
  generateRandomString,
} from '@/utils/functions';

import 'react-toastify/dist/ReactToastify.css';

const useToastContextLogic = () => {

  const dismissToast = useCallback(({ toastId = '' }) => {
    toast.dismiss(toastId);
  }, []);
  
  const base = useCallback((fn, message, options = {}) => {
    const finalMessage = message || '';
    toast.dismiss();
    setTimeout(() => {
      return fn(finalMessage, {
        ...SHARED_TOAST_CONF,
        ...options,
      });
    }, 300);
  }, []);

  const toastifyLoading = useCallback(({ message = '' }) =>
    base(toast, message, LOADING_TOAST_CONF), [base]);

  const toastifySuccessMessage = useCallback(({
    message = '',
    toastId,
  }) => base(toast.success, message, {
    toastId: toastId || generateRandomString(),
  }), [base]);

  const toastifyWarningMessage = useCallback(({
    message = '',
    ...options
  }) => base(toast.warn, message, options), [base]);

  const toastifyErrorMessage = useCallback(({
    message = '',
    canBeDismissed = true,
    toastId,
  }) => {
    const conf = canBeDismissed
      ? {
        toastId: toastId || generateRandomString(),
      }
      : {
          ...LOADING_TOAST_CONF,
          toastId: toastId || generateRandomString(),
        };
    return base(toast.error, message, conf);
  }, [base]);

  return {
    toastifyLoading,
    toastifySuccessMessage,
    toastifyWarningMessage,
    toastifyErrorMessage,
    dismissToast,
  };
};

export default useToastContextLogic;