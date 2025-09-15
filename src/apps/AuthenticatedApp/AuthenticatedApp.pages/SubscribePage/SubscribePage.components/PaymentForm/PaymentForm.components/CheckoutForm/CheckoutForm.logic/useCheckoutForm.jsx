import {
  useContext,
  useState,
} from 'react';
import {
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  useCounter,
  AppContext,
} from '@/utils';
import {
  VITE_WEB_APP_URL,
} from '@/config';
import ROUTES from '@/routes';
import {
  useOutletContext,
} from 'react-router';

const useCheckoutForm = ({
  clientSecret,
}) => {
  const {
    t,
  } = useContext(AppContext);
  const {
    currentOrganization: {
      _id: currentOrganizationId = '',
    } = {},
  } = useOutletContext();
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [hasAnError, setHasAnError] = useState(false);

  const {
    incrementCounter: incrementNbFormSubmissionCounter,
    counter: nbFormSubmissionCounter,
  } = useCounter();

  const handleSubmit = async () => {
    setIsLoading(true);
    setHasAnError(false);
    const {
      error: submitError,
    } = await elements.submit();
    if (submitError) {
      setHasAnError(true);
      setIsLoading(false);
      incrementNbFormSubmissionCounter();
      return;
    }
    
    const {
      error,
    } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${VITE_WEB_APP_URL}/${ROUTES.organizations}/${currentOrganizationId}`,
      },
    });
  
    if (error) {
      setHasAnError(true);
      setIsLoading(false);
      incrementNbFormSubmissionCounter();
    }
  };

  return {
    isLoading,
    handleSubmit,
    stripe,
    hasAnError,
    nbFormSubmissionCounter,
    t,
  };
};

export default useCheckoutForm;
