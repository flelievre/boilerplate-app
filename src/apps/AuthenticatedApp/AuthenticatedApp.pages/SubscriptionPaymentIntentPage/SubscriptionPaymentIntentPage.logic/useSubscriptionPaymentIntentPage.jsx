import {
  useContext,
  useEffect,
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
  useExecuteRegularly,
} from '@/utils';
import ROUTES from '@/routes';
import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';

const useSubscriptionPaymentIntentPage = () => {
  const {
    subscriptionPaymentIntentId = '',
    subscriptionFunnelId = '',
  } = useParams();

  const {
    currentOrganization: {
      _id: organizationId = '',
    } = {},
    setActiveDrawerLinkKey,
    generateOrganizationRoute,
  } = useOutletContext();

  const {
    t,
  } = useContext(AppContext);

  const {
    setBreadcrumbs,
  } = useContext(BreadcrumbsContext);

  const navigate = useNavigate();

  const {
    doc,
    isLoading: isInitializingListener,
  } = useDocSocket({
    docType: 'subscriptionPaymentIntent',
    docId: subscriptionPaymentIntentId,
    isAuthorized: true,
  });

  useExecuteRegularly({
    method: axios.requestWithAuth('get', `${VITE_BACKEND_URL}/${ROUTES.organizations}/${organizationId}/${ROUTES.subscriptionFunnels}/${subscriptionFunnelId}/payment-intents/${subscriptionPaymentIntentId}`),
  });

  useEffect(() => {
    setActiveDrawerLinkKey(ROUTES.subscriptions);
    setBreadcrumbs([
      {
        label: 'Subscriptions',
        to: generateOrganizationRoute(ROUTES.subscriptions),
        sx: {
          color: 'primary.main',
        },
        icon: 'material-symbols:credit-card',
      },
      {
        label: 'Payment Status',
        sx: {
          color: 'text.secondary',
        },
      },
    ]);
  }, [setActiveDrawerLinkKey, setBreadcrumbs, generateOrganizationRoute]);

  const handleRetryPayment = () => {
    if (doc?.subscriptionFunnelId) {
      // Navigate to the subscription funnel to retry payment
      const retryRoute = generateOrganizationRoute(`${ROUTES.subscriptionFunnels}/${doc.subscriptionFunnelId}`);
      navigate(retryRoute);
    }
  };

  return {
    t,
    doc,
    isInitializingListener,
    subscriptionPaymentIntentId,
    handleRetryPayment,
    generateOrganizationRoute,
  };
};

export default useSubscriptionPaymentIntentPage;
