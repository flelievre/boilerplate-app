/*
  Created by François LELIEVRE ©
*/

/* [+] Community imports */
import {
  createContext,
} from 'react';

const ToastContext = createContext({
  toastifyLoading: () => {},
  toastifySuccessMessage: () => {},
  toastifyWarningMessage: () => {},
  toastifyErrorMessage: () => {},
  dismissToast: () => {},
});

export default ToastContext;
