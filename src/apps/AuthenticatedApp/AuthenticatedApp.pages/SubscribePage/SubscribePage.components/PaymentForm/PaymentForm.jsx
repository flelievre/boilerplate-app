import {
  usePaymentForm,
} from './PaymentForm.logic';
import {
  Typography,
  Paper,
  Box,
  Container,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material';
import {
  SubmitButton,
} from '@/utils';
import {
  Icon as IconifyIcon,
} from '@iconify/react';
import {
  Elements,
} from '@stripe/react-stripe-js';
import {
  stripe,
} from '@/config';
import {
  CheckoutForm,
} from './PaymentForm.components';

const PaymentForm = ({
  planName = '',
  subscriptionFunnelId = '',
  updateSubscriptionFunnel = () => {},
}) => {
  const {
    goBack,
    t,
    isMobile,
    isFetchingPaymentIntent,
    priceListInfos,
    elementOptions,
    clientSecret,
    stripeSubscriptionId,
  } = usePaymentForm({
    updateSubscriptionFunnel,
    subscriptionFunnelId,
    planName,
  });

  return (
    <Container
      id="payment-form"
      maxWidth="md"
      sx={{
        pt: {
          xs: 8,
          sm: 12,
        },
        pb: {
          xs: 8,
          sm: 16,
        },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: {
          xs: 1,
        },
      }}
    >
      <Typography
        component="h1"
        variant=""
      >
        {t(`${planName} subscription`)}
      </Typography>
      <Typography
        component="h2"
        variant="body1"
        color="primary.dark"
      >
        {t('StripeCreateSubscriptionPage')}
      </Typography>
      <Box
        sx={{
          width: {
            xs: '100%',
          },
          textAlign: 'left',
        }}
      >
        <Button
          size={(
            isMobile
              ? 'small'
              : 'medium'
          )}
          onClick={goBack}
          startIcon={(
            <IconifyIcon
              icon="material-symbols:arrow-left-alt-rounded"
            />
          )}
          variant="outlined"
          sx={{
            my: 2,
          }}
        >
          {t('Back')}
        </Button>
      </Box>
      <Paper
        sx={{
          px: 3,
          pt: 3,
          pb: 5,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          minWidth: '100%',
        }}
      >
        {(isFetchingPaymentIntent
          ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 250,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
          <List
            sx={{
              width: '100%',
              maxWidth: 'none',
              px: 1,
            }}
            disablePadding
          >
            {(priceListInfos.map(({
              key = '',
              primaryText = '',
              secondaryTextLine1 = null,
              secondaryTextLine2 = null,
              amount = 0,
            }) => (
              <ListItem
                key={key}
                secondaryAction={amount}
              >
                <ListItemText
                  primary={primaryText}
                  secondary={(
                    secondaryTextLine1
                      ? (
                        <Stack component="span">
                          <Box component="span">
                            {secondaryTextLine1}
                          </Box>
                          {secondaryTextLine2 && (
                            <Box component="span">
                              <b>{secondaryTextLine2}</b>
                            </Box>
                          )}
                        </Stack>
                      )
                      : null
                  )}
                />
              </ListItem>
              )))}
            </List>
            <Divider
              sx={{
                mb: 2,
              }}
            />
            <Elements stripe={stripe} options={elementOptions}>
              <CheckoutForm
                clientSecret={clientSecret}
                subscriptionFunnelId={subscriptionFunnelId}
                stripeSubscriptionId={stripeSubscriptionId}
              />
            </Elements>
          </>
        ))}
      </Paper>
    </Container>
  );
};

export default PaymentForm;
