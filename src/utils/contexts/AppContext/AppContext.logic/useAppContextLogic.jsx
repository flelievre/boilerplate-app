import {
  useContext,
  useState,
} from 'react';
import ScreenContext from '../../ScreenContext/ScreenContext';
import ThemeContext from '../../ThemeContext/ThemeContext';
import ToastContext from '../../ToastContext/ToastContext';
import TranslationContext from '../../TranslationContext/TranslationContext';
import BreadcrumbsContext from '../../BreadcrumbsContext/BreadcrumbsContext';
import {
  useNetworkStatus,
 } from '../../../hooks';
import useAppFormLogic from './useAppFormLogic';

const useAppContextLogic = () => {
  const {
    ...screenContextProps
  } = useContext(ScreenContext);
  const {
    ...breadcrumbContextProps
  } = useContext(BreadcrumbsContext);
  const {
    ...themeContextProps
  } = useContext(ThemeContext);
  console.log(themeContextProps);
  const {
    toastifySuccessMessage,
    toastifyErrorMessage,
    dismissToast,
    ...toastContextProps
  } = useContext(ToastContext);
  const {
    t,
    ...translationContextProps
  } = useContext(TranslationContext);
  const {
    ...networkStatusProps
  } = useNetworkStatus({
    onOfflineHandler :() => toastifyErrorMessage({
      message: 'You seem to be offline',
      canBeDismissed: false,
      toastId: 'offlineToastId',
    }),
    onOnlineHandler: () => dismissToast({
      toastId: 'offlineToastId',
    }),
  });

  const [isAppLoading, setIsAppLoading] = useState(false);

  const {
    handleFormSubmission,
  } = useAppFormLogic({
    t,
    setIsAppLoading,
    toastifySuccessMessage,
    toastifyErrorMessage,
  });

  return {
    ...screenContextProps,
    ...themeContextProps,
    ...toastContextProps,
    ...breadcrumbContextProps,
    toastifySuccessMessage,
    toastifyErrorMessage,
    dismissToast,
    t,
    ...translationContextProps,
    ...networkStatusProps,
    isAppLoading,
    setIsAppLoading,
    handleFormSubmission,
  };
};

export default useAppContextLogic;
