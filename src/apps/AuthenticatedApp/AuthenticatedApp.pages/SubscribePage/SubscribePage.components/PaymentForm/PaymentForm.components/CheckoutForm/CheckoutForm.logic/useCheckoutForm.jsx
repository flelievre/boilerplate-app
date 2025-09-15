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
  VITE_BACKEND_URL,
  axios,
} from '@/config';
import ROUTES from '@/routes';
import {
  useOutletContext,
} from 'react-router';
import {
  patchSubscriptionFunnel,
} from '../../../../../SubscribePage.functions';

const useCheckoutForm = ({
  clientSecret,
  subscriptionFunnelId,
  stripeSubscriptionId,
}) => {
  const {
    t,
    lang,
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
    let subscriptionPaymentIntentId = '';

    try {
      const {
        data: {
          data: {
            subscriptionPaymentIntentId: subscriptionPaymentIntentIdFromBackend,
          },
        },
      } = await patchSubscriptionFunnel({
        organizationId: currentOrganizationId,
        subscriptionFunnelId,
        payload: {
          stripeSubscriptionId,
        },
      });
      subscriptionPaymentIntentId = subscriptionPaymentIntentIdFromBackend;
    } catch (e) {
      console.error(e);
      setHasAnError(true);
      setIsLoading(false);
      incrementNbFormSubmissionCounter();
      return;
    }

    const {
      error: submitError,
    } = await elements.submit();
    if (submitError) {
      const {
        code = '',
        message = '',
        type = '',
        decline_code = '',
        param = '',
      } = submitError;
      setHasAnError(true);
      setIsLoading(false);
      incrementNbFormSubmissionCounter();
      await axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/organizations/${currentOrganizationId}/subscription-funnels/${subscriptionFunnelId}/payment-intents/${subscriptionPaymentIntentId}`, {
        code,
        message,
        type,
        decline_code,
        param,
      });
      return;
    }
    
    const {
      error,
    } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${VITE_WEB_APP_URL}/${lang}/${ROUTES.organizations}/${currentOrganizationId}/${ROUTES.subscriptionFunnels}/${subscriptionFunnelId}/${ROUTES.paymentIntents}/${subscriptionPaymentIntentId}`,
      },
    });
  
    if (error) {
      const {
        code = '',
        message = '',
        type = '',
        decline_code = '',
        param = '',
      } = error;
      await axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/organizations/${currentOrganizationId}/subscription-funnels/${subscriptionFunnelId}/payment-intents/${subscriptionPaymentIntentId}`, {
        code,
        message,
        type,
        decline_code,
        param,
      });
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
