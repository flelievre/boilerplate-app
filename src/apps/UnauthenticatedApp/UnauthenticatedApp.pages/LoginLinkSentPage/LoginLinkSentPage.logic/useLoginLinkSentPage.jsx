import {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  useNavigate,
} from 'react-router';
import {
  AppContext,
  useForm,
  useStoredTimer,
} from '@/utils';
import logoLarge from '/logo-large.jpg';
import {
  VITE_AUTH_URL,
  VITE_APP_NAME,
  VITE_RECAPTCHA_SITEKEY,
  axios,
} from '@/config';
import ROUTES from '@/routes';

const useLoginLinkSentPage = () => {
  const {
    isMobile,
    isAppLoading,
    t,
    handleFormSubmission,
    generateRoute,
    lang,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('emailForLoginLink');
    if (storedEmail) {
      setEmail(storedEmail);
      // localStorage.removeItem('emailForLoginLink');
    }
  }, []);

  const [isFormLoading, setIsFormLoading] = useState(true);
  const {
    setStoreTimer,
    secondsLeft: secondsLeftToRequestANewLoginLink,
    isActive: hasRequestedLoginLinkInLastMinute,
  } = useStoredTimer({
    localStorageKey: 'loginLinkRequestTimer',
  });

  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    if (document.querySelector('#recaptcha-script')) {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsFormLoading(false);
        });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'recaptcha-script';
    script.src = `https://www.google.com/recaptcha/api.js?render=${VITE_RECAPTCHA_SITEKEY}`;
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsFormLoading(false);
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  const resendLoginLink = async () => {
    if (!window.grecaptcha) return;
    const recaptchaToken = await window.grecaptcha.execute(VITE_RECAPTCHA_SITEKEY, {
      action: 'send_login_link',
    });
    return (
      axios.post(
        `${VITE_AUTH_URL}/auth/login-link/request`,
        {
          email,
          lang,
          recaptchaToken,
        },
      )
    );
  };

  const successHandler = () => {
    setStoreTimer();
  }

  const {
    handleFormAction: onResendLoginLink,
  } = useForm({
    isFormLoading,
    setIsFormLoading,
    handleFormSubmission,
    formAction: resendLoginLink,
    showFormActionErrorToast: true,
    shouldSetAppInLoadingMode: true,
    successMessageToDisplay: t('New login link sent by email'),
    successHandler,
    t,
    email,
  });

  const onGoBack = () => {
    navigate(generateRoute(ROUTES.loginLinkRequest));
  }

  return {
    isMobile,
    onResendLoginLink,
    email,
    isAppLoading,
    t,
    secondsLeftToRequestANewLoginLink,
    hasRequestedLoginLinkInLastMinute,
    onGoBack,
    VITE_APP_NAME,
    logoLarge,
  };
};

export default useLoginLinkSentPage; 