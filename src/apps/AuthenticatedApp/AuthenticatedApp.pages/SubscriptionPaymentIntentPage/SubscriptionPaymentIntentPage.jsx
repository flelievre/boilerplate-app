import {
  Typography,
} from '@mui/material';
import {
  AlertWithLoader,
} from '@/utils';
import { useSubscriptionPaymentIntentPage } from './SubscriptionPaymentIntentPage.logic';

const SubscriptionPaymentIntentPage = () => {
  const {
    t,
    severity,
    title,
    message,
    loading,
    icon,
    button,
  } = useSubscriptionPaymentIntentPage();
  return (
    <>
      <Typography
        component="h1"
        variant=""
      >
        {t('Payment status')}
      </Typography>
      <Typography
        component="h2"
        variant="body1"
        color="primary.dark"
        sx={{
          mb: 2,
        }}
      >
        {t('Follow payment progress')}
      </Typography>
      <AlertWithLoader
        severity={severity}
        icon={icon}
        loading={loading}
        title={title}
        message={message}
        button={button}
      />
    </>
  )
};

export default SubscriptionPaymentIntentPage;
