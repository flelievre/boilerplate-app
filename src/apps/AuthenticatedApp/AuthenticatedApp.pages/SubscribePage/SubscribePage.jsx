import {
  useSubscribePage,
} from './SubscribePage.logic';
import {
  AddressForm,
  PlanForm,
  PaymentForm,
} from './SubscribePage.components';
import {
  Box,
  CircularProgress,
} from '@mui/material';

const SubscribePage = () => {
  const {
    productsWithMonthlyOrYearlyPrice,
    isInitiating,
    step,
    toggleYearlyOrMonthlyPrice,
    isShowingMonthlyPrice,
    selectPlan,
    updateSubscriptionFunnel,
    stripePriceId,
    isLoading,
    subscriptionFunnelId,
    planName,
  } = useSubscribePage();

  return isInitiating
    ? (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 250,
          mt: 15,
        }}
      >
        <CircularProgress />
      </Box>
    )
    : (
    <>
      {(step === 'plan_selection' && (
        <PlanForm
          isLoading={isLoading}
          selectPlan={selectPlan}
          productsWithMonthlyOrYearlyPrice={productsWithMonthlyOrYearlyPrice}
          isShowingMonthlyPrice={isShowingMonthlyPrice}
          toggleYearlyOrMonthlyPrice={toggleYearlyOrMonthlyPrice}
          updateSubscriptionFunnel={updateSubscriptionFunnel}
        />
      ))}
      {(step === 'address_collection' && (
        <AddressForm
          updateSubscriptionFunnel={updateSubscriptionFunnel}
          stripePriceId={stripePriceId}
        />
      ))}
      {(step === 'checkout' && (
        <PaymentForm
          planName={planName}
          updateSubscriptionFunnel={updateSubscriptionFunnel}
          subscriptionFunnelId={subscriptionFunnelId}
          stripePriceId={stripePriceId}
        />
      ))}
    </>
  );
};

export default SubscribePage;
