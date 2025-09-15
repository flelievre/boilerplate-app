import ROUTES from '@/routes';
import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';

const patchSubscriptionFunnel = ({
  organizationId,
  subscriptionFunnelId,
  payload: {
    step = '',
    stripePriceId = '',
    stripeSubscriptionId = '',
  } = {},
}) => (
  axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/${ROUTES.organizations}/${organizationId}/${ROUTES.subscriptionFunnels}/${subscriptionFunnelId}`, {
    step,
    stripePriceId,
    stripeSubscriptionId,
  })
);

export default patchSubscriptionFunnel;
