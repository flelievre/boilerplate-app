import {
  useEffect,
} from 'react';
import {
  useNavigate,
} from 'react-router';
import RedirectContext from './RedirectContext';

const RedirectProvider = ({
  children,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const redirectTo = localStorage.getItem('postAuthRedirect');
    if (redirectTo) {
      localStorage.removeItem('postAuthRedirect');
      navigate(redirectTo, { replace: true });
    }
  }, []);

  return (
    <RedirectContext.Provider value={{}}>
      {children}
    </RedirectContext.Provider>
  );
};

export default RedirectProvider;