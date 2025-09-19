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
import {
  Alert,
} from '@mui/material';

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
    errorMessage,
  } = useCheckoutForm({
    clientSecret,
    subscriptionFunnelId,
    stripeSubscriptionId,
  });
  return (
    <>
      <PaymentElement />
      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            mt: 2,
          }}
        >
          {errorMessage}
        </Alert>
      )}
      <SubmitButton
        defaultContent={t('Subscribe')}
        errorContent={t(errorMessage)}
        errorMessage={errorMessage}
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
