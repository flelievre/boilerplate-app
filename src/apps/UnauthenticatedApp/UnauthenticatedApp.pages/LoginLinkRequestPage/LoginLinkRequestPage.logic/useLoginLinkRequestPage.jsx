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
  useLowerCase,
  useForm,
  useStoredTimer,
} from '@/utils';
import {
  VITE_APP_NAME,
  VITE_AUTH_URL,
  VITE_RECAPTCHA_SITEKEY,
  axios,
} from '@/config';
import ROUTES from '@/routes';
import logoLarge from '/logo-large.jpg';
import {
  INPUTS_ERRORS,
} from '../LoginLinkRequestPage.constants';
import {
  areFormInputsInvalid,
} from '../LoginLinkRequestPage.functions';

const useLoginLinkRequestPage = () => {
  const {
    isMobile,
    isAppLoading,
    t,
    handleFormSubmission,
    generateRoute,
    lang,
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get('next');
    if (next) {
      localStorage.setItem('postAuthRedirect', next);
    }
  }, []);

  const [email, setEmail] = useLowerCase('');
  const storedEmail = localStorage.getItem('emailForLoginLink');

  useEffect(() => {
    if (storedEmail) {
      setEmail(storedEmail);
      // localStorage.removeItem('emailForLoginLink');
    }
  }, []);

  const [isFormLoading, setIsFormLoading] = useState(true);

  const{
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
      console.log('loadRecaptcha');
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsFormLoading(false);
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  const requestLoginLink = async () => {
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
    localStorage.setItem('emailForLoginLink', email);
    setStoreTimer();
    navigate(generateRoute(ROUTES.loginLinkSent));
  }

  const {
    nbFormSubmissionCounter,
    hasAnError,
    handleFormAction: onLoginLinkRequest,
    email: emailErrorHelper,
  } = useForm({
    isFormLoading,
    setIsFormLoading,
    handleFormSubmission,
    formAction: requestLoginLink,
    areFormInputsInvalid: areFormInputsInvalid,
    inputsErrorsTexts: INPUTS_ERRORS,
    showFormActionErrorToast: true,
    shouldSetAppInLoadingMode: true,
    successMessageToDisplay: t('Login link sent by email'),
    successHandler,
    t,
    email,
  });

  const buttonTimedoutText = storedEmail
  ? t('Didn\'t you get anything? Try again in {seconds}s', {
    seconds: secondsLeftToRequestANewLoginLink,
  })
  : t('Try again in {seconds}s', {
    seconds: secondsLeftToRequestANewLoginLink,
  });

  return {
    isMobile,
    onLoginLinkRequest,
    email,
    setEmail,
    emailErrorHelper,
    hasAnError,
    nbFormSubmissionCounter,
    isAppLoading,
    logoLarge,
    VITE_APP_NAME,
    t,
    secondsLeftToRequestANewLoginLink,
    hasRequestedLoginLinkInLastMinute,
    buttonTimedoutText,
    storedEmail,
  };
};

export default useLoginLinkRequestPage;
