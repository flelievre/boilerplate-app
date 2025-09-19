import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';

const getOrganizationPaymentMethods = async ({
  isAuthorized = false,
  organizationId,
  limit = 10,
  startingAfter = undefined,
  endingBefore = undefined,
}) => {
  if (!isAuthorized) {
    return {
      collection: [],
      counts: {},
    };
  }

  const {
    data,
  } = await axios.requestWithAuth('get', `${VITE_BACKEND_URL}/organizations/${organizationId}/payment-methods`, {
    limit,
    startingAfter,
    endingBefore,
  });

  return data.data;
};

export default getOrganizationPaymentMethods;
