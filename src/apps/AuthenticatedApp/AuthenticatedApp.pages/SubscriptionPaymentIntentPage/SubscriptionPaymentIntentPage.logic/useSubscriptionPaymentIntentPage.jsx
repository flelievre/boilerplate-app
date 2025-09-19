import {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useParams,
  useOutletContext,
  useNavigate,
} from 'react-router';
import {
  useDocSocket,
  AppContext,
  BreadcrumbsContext,
} from '@/utils';
import ROUTES from '@/routes';
import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';
import {
  AuthUserContext,
} from '@/contexts';
import {
  sendPaymentStatusIssueMail,
  generatePaymentStatusAlertInfo,
} from '../SubscriptionPaymentIntentPage.functions';

const useSubscriptionPaymentIntentPage = () => {
  const {
    subscriptionPaymentIntentId = '',
    subscriptionFunnelId = '',
  } = useParams();

  const {
    authUser: {
      _id: authUserId,
      email: authUserEmail,
      firstName: authUserFirstName,
      lastName: authUserLastName,
    } = {},
  } = useContext(AuthUserContext);

  const {
    currentOrganization: {
      _id: organizationId = '',
    } = {},
    setActiveDrawerLinkKey,
    generateOrganizationRoute,
  } = useOutletContext();

  const {
    t,
    formatDate,
  } = useContext(AppContext);

  const {
    setBreadcrumbs,
  } = useContext(BreadcrumbsContext);

  const navigate = useNavigate();

  const {
    doc: subscriptionPaymentIntent,
    error: errorFetchingSubscriptionPaymentIntent,
    isLoading: isFetchingSubscriptionPaymentIntent,
  } = useDocSocket({
    docType: 'subscriptionPaymentIntent',
    docId: subscriptionPaymentIntentId,
    isAuthorized: true,
  });

  const {
    subscriptionFunnel: subscriptionPaymentIntentSubscriptionFunnelId = '',
    status: subscriptionPaymentIntentStatus = 'processing',
    subscription = null,
    updatedAt: subscriptionPaymentIntentUpdatedAt = '',
  } = subscriptionPaymentIntent || {};
  
  const {
    latestInvoicePdf = '',
    planName = '',
    planMaxCredits = 0,
    stripeStatus: stripeSubscriptionStatus = '',
  } = subscription || {};

  const formattedSubscriptionPaymentIntentUpdatedAt = subscription
    ? formatDate(subscriptionPaymentIntentUpdatedAt)
    : '';

  const [errorFromBackend, setErrorFromBackend] = useState(null);
  
  const request = async () => {
    if (errorFromBackend) return;
    try {
      console.log('REQUESTING');
      await axios.requestWithAuth('get', `${VITE_BACKEND_URL}/${ROUTES.organizations}/${organizationId}/${ROUTES.subscriptionFunnels}/${subscriptionFunnelId}/payment-intents/${subscriptionPaymentIntentId}`);
    } catch (e) {
      setErrorFromBackend(e);
    }
  };

  useEffect(() => {
    const interval = setInterval(request, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [errorFromBackend]);

  useEffect(() => {
    setActiveDrawerLinkKey(ROUTES.subscriptions);
    setBreadcrumbs([
      {
        icon: 'material-symbols:credit-card',
        label: 'Payment Status',
        sx: {
          color: 'text.secondary',
        },
      },
    ]);
  }, [setActiveDrawerLinkKey, setBreadcrumbs, generateOrganizationRoute]);

  const handleRetryPayment = () => {
    console.log('handleRetryPayment', subscriptionPaymentIntentSubscriptionFunnelId);
    if (subscriptionPaymentIntentSubscriptionFunnelId) {
      // Navigate to the subscription funnel to retry payment
      const retryRoute = generateOrganizationRoute(`${ROUTES.subscriptionFunnels}/${subscriptionPaymentIntentSubscriptionFunnelId}`);
      navigate(retryRoute);
    }
  };

  const handleSendPaymentStatusIssueMail = () => {
    sendPaymentStatusIssueMail({
      t,
      link: window.location.href.split('?')[0],
      authUserEmail,
      authUserId,
      authUserFirstName,
      authUserLastName,
    });
  };

  const {
    severity,
    title,
    message,
    loading,
    icon,
    button,
  } = generatePaymentStatusAlertInfo({
    t,
    handleSendPaymentStatusIssueMail,
    isFetchingSubscriptionPaymentIntent,
    errorFetchingSubscriptionPaymentIntent,
    subscriptionPaymentIntentStatus,
    stripeSubscriptionStatus,
    handleRetryPayment,
    formattedSubscriptionPaymentIntentUpdatedAt,
    planName,
    planMaxCredits,
    latestInvoicePdf,
  });

  console.log('latestInvoicePdf', latestInvoicePdf);

  return {
    t,
    severity,
    title,
    message,
    loading,
    icon,
    button,
  };
};

export default useSubscriptionPaymentIntentPage;
