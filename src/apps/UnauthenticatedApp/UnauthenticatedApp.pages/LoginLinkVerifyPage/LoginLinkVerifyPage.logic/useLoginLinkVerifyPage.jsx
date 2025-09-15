import {
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {
  useLocation,
  useNavigate,
} from 'react-router';
import {
  axios,
  VITE_AUTH_URL,
  VITE_APP_NAME,
} from '@/config';
import {
  AppContext,
} from '@/utils';
import ROUTES from '@/routes';
import logoLarge from '/logo-large.jpg';

const useLoginLinkVerifyPage = () => {
  const {
    t,
    generateRoute,
    isMobile,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const didRequest = useRef(false);

  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  useEffect(() => {
    if (!token || didRequest.current) {
      setError(t('Invalid or expired login link, please try again.'));
      setSuccess('');
      return;
    }
    didRequest.current = true;
    let cancelled = false;

    const verifyToken = async () => {
      try {
        setIsLoading(true);
        const {
          data: {
            data: {
              jwe,
            },
          } = {},
        } = await axios.get(`${VITE_AUTH_URL}/auth/login-link/verify?token=${token}`, {
          withCredentials: true,
        });
        console.log('jwe', jwe);
        localStorage.setItem('jwe', jwe);
        window.dispatchEvent(new Event('jwe'));
        setError('');
        setSuccess(t('You will be automatically redirected to your secure space.'));
        localStorage.removeItem('emailForLoginLink');

        if (!cancelled) setIsLoading(false);
      } catch (e) {
        if (!cancelled) {
          setSuccess('');
          setError(t(e.message));
          setIsLoading(false);
        }
      }
    };

    verifyToken();

    return () => {
      cancelled = true;
    };
  }, []);

  const onGoBack = () => {
    navigate(generateRoute(ROUTES.loginLinkRequest));
  }

  const isShowingAMessage = error || success;

  return {
    isLoading,
    success,
    error,
    t,
    onGoBack,
    isMobile,
    logoLarge,
    VITE_APP_NAME,
    isShowingAMessage,
  };
};

export default useLoginLinkVerifyPage; 