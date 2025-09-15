import React from 'react';
import {
  PaymentElement,
} from '@stripe/react-stripe-js';
import {
  SubmitButton,
} from '@/utils';
import {
  useCheckoutForm,
} from './CheckoutForm.logic';

const CheckoutForm = ({
  clientSecret,
  subscriptionFunnelId,
  stripeSubscriptionId,
}) => {
  const {
    t,
    handleSubmit,
    stripe,
    hasAnError,
    nbFormSubmissionCounter,
    isLoading,
  } = useCheckoutForm({
    clientSecret,
    subscriptionFunnelId,
    stripeSubscriptionId,
  });
  return (
    <>
      <PaymentElement />
      <SubmitButton
        defaultContent={t('Subscribe')}
        errorContent={t('Error')}
        shouldShowErrorState={hasAnError}
        nbClick={nbFormSubmissionCounter}
        loading={isLoading}
        disabledOnSuccess={!stripe}
        disabledOnError={!stripe}
        disabledOnDefault={!stripe || isLoading}
        onClick={handleSubmit}
        sx={{
          mt: 2,
        }}
      />
    </>
  );
};

export default CheckoutForm;
