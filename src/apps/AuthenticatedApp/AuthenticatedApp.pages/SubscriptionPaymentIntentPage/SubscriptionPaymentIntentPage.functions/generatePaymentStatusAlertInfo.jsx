const generatePaymentStatusAlertInfo = ({
  t = () => {},
  handleSendPaymentStatusIssueMail = () => {},
  isFetchingSubscriptionPaymentIntent = true,
  errorFetchingSubscriptionPaymentIntent = null,
  subscriptionPaymentIntentStatus = 'processing',
  stripeSubscriptionStatus = '',
  handleRetryPayment = () => {},
  formattedSubscriptionPaymentIntentUpdatedAt = '',
  planName = '',
  planMaxCredits = 0,
  latestInvoicePdf = '',
}) => {
  if (isFetchingSubscriptionPaymentIntent) {
    return {
      severity: 'info',
      title: t('Fetching payment information'),
      message: t('Please wait, we are fetching the payment details.'),
      loading: true,
      icon: false,
      button: null,
    };
  }
  if (errorFetchingSubscriptionPaymentIntent) {
    return {
      severity: 'error',
      icon: true,
      loading: false,
      title: t('Payment not found'),
      message: t('An error occurred while fetching the payment information.'),
      button: {
        variant: 'contained', 
        color: 'error',
        size: 'small',
        label: t('Contact support'),
        onClick: handleSendPaymentStatusIssueMail,
      },
    };
  } else if (subscriptionPaymentIntentStatus === 'processing') {
    return {
      button: null,
      severity: 'info',
      title: t('Processing the payment'),
      message: t('Please wait while we are confirming the payment and activating the plan'),
      loading: true,
      icon: false,
    };
  } else if (subscriptionPaymentIntentStatus === 'succeeaded') {
    if (stripeSubscriptionStatus === 'active') {
      return {
        icon: true,
        loading: false,
        severity: 'success',
        title: t('Payment successful'),
        message: t('Your {planName} plan is now active! You can enjoy {planMaxCredits} monthly credits and, if needed, can upgrade anytime.', { planName, planMaxCredits }),
        button: {
          variant: 'contained', 
          color: 'success',
          icon: 'heroicons:document-text-solid',
          size: 'small',
          label: t('Download receipt'),
          onClick: () => {
            window.open(latestInvoicePdf, '_blank', 'noopener,noreferrer');
          },
        },
      }
    } else {
      return {
        icon: true,
        loading: false,
        severity: 'success',
        title: t('Payment successful'),
        message: t('Your payment was successfuly processed on the {formattedSubscriptionPaymentIntentUpdatedAt}.', { formattedSubscriptionPaymentIntentUpdatedAt }),
        button: {
          variant: 'contained', 
          color: 'success',
          size: 'small',
          icon: 'heroicons:document-text-solid',
          label: t('Download receipt'),
          onClick: () => {
            window.open(latestInvoicePdf, '_blank', 'noopener,noreferrer');
          },
        },
      }
    }
  } else {
    return {
      icon: true,
      loading: false,
      severity: 'error',
      title: t('Payment failed'),
      message: t('There was an issue processing your payment, you were not charged. Please try again.'),
      button: {
        variant: 'contained', 
        color: 'error',
        size: 'small',
        label: t('Retry'),
        onClick: handleRetryPayment,
      },
    }
  }
};

export default generatePaymentStatusAlertInfo;
