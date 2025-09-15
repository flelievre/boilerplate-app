import {
  Typography,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import { useSubscriptionPaymentIntentPage } from './SubscriptionPaymentIntentPage.logic';

const SubscriptionPaymentIntentPage = () => {
  const {
    t,
    doc,
    isInitializingListener,
    subscriptionPaymentIntentId,
    handleRetryPayment,
  } = useSubscriptionPaymentIntentPage();

  // Show loading state while initializing
  if (isInitializingListener) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          textAlign: 'center',
        }}
      >
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          {t('Loading payment information...')}
        </Typography>
      </Box>
    );
  }

  // Payment not found
  if (!doc && !isInitializingListener) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          color="error"
          sx={{ mb: 2 }}
        >
          {t('Payment Not Found')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('The payment information you are looking for could not be found.')}
        </Typography>
      </Box>
    );
  }

  const { status } = doc || {};

  // Processing status
  if (status === 'processing') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          textAlign: 'center',
        }}
      >
        <CircularProgress size={60} sx={{ mb: 3 }} />
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 2 }}
        >
          {t('Processing your subscription')}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 500 }}
        >
          {t('Please wait while we are confirming your payment and activating your plan')}
        </Typography>
      </Box>
    );
  }

  // Success status
  if (status === 'succeeded') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'success.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: 'white' }}
          >
            ✓
          </Typography>
        </Box>
        <Typography
          component="h1"
          variant="h4"
          color="success.main"
          sx={{ mb: 2 }}
        >
          {t('Subscription activated')}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 500 }}
        >
          {t('You are now all set to secure your applications')}
        </Typography>
      </Box>
    );
  }

  // Error status
  if (status === 'error' || status === 'requires_payment_method' || status === 'canceled') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'error.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: 'white' }}
          >
            ✕
          </Typography>
        </Box>
        <Typography
          component="h1"
          variant="h4"
          color="error"
          sx={{ mb: 2 }}
        >
          {t('Payment was unsuccessful')}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: 500 }}
        >
          {t('There was an issue processing your payment. Please try again.')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleRetryPayment}
          sx={{ minWidth: 200 }}
        >
          {t('Retry Payment')}
        </Button>
      </Box>
    );
  }

  // Unknown status fallback
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 400,
        textAlign: 'center',
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{ mb: 2 }}
      >
        {t('Payment Status: {status}', { status })}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {t('Payment ID: {subscriptionPaymentIntentId}', { subscriptionPaymentIntentId })}
      </Typography>
    </Box>
  );
};

export default SubscriptionPaymentIntentPage;
