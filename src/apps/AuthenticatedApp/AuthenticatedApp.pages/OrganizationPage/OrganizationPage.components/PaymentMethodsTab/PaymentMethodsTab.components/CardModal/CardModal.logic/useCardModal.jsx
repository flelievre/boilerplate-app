import {
  useState,
  useContext,
} from 'react';
import {
  useOutletContext,
} from 'react-router';
import {
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';
import {
  useCounter,
  AppContext,
} from '@/utils';

const useCardModal = ({
  hideCardModal = () => {},
  reloadAllData = () => {},
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const {
    currentOrganization: {
      _id: organizationId = '',
    } = {},
  } = useOutletContext();

  const {
    t,
    isMobile,
    isThemeDark,
    theme,
    lang,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [hasAnError, setHasAnError] = useState(false);

  const {
    incrementCounter: incrementNbFormSubmissionCounter,
    counter: nbFormSubmissionCounter,
  } = useCounter();

  const handleSubmit = async () => {
    setHasAnError(false);
    // We don't want to let default form submission happen here,
    // which would refresh the page.

    if (!stripe || !elements) {
      setHasAnError(true);
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);
    const {
      paymentMethod,
      error,
    } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setIsLoading(false);
      setHasAnError(true);
      incrementNbFormSubmissionCounter();
      return;
    }

    try {
      await axios.requestWithAuth('put', `${VITE_BACKEND_URL}/organizations/${organizationId}/payment-method`, {
        paymentMethodId: paymentMethod.id,
      });
      hideCardModal();
      reloadAllData();
    } catch (e) {
      incrementNbFormSubmissionCounter();
      setIsLoading(false);
      setHasAnError(true);
    }

    setIsLoading(false);
    setHasAnError(false);
  };

  const elementOptions = {
    locale: lang,
    appearance: {
      theme: isThemeDark ? 'night' : 'stripe',
      variables: {
        colorPrimary: theme.palette.primary.main,
        colorBackground: theme.palette.background.default,
        colorText: theme.palette.text.primary,
        colorDanger: theme.palette.error.main,
        fontFamily: theme.typography.fontFamily,
      }
    },
  }

  return {
    stripe,
    handleSubmit,
    isLoading,
    hasAnError,
    nbFormSubmissionCounter,
    t,
    isMobile,
    elementOptions,
    isThemeDark,
  };
};

export default useCardModal;
