import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';

const getUserInvitations = async ({
  isAuthorized = true,
  search = '',
  limit = 10,
  order = 'createdAt',
  orderBy = 'desc',
  skip = 0,
  filters = [],
}) => {
  if (!isAuthorized) {
    return {
      collection: [],
      counts: {},
    };
  }
  const {
    data,
  } = await axios.requestWithAuth('get', `${VITE_BACKEND_URL}/me/invitations`, {
    search,
    limit,
    order,
    orderBy,
    skip,
    filters: encodeURIComponent(JSON.stringify(filters)),
  });
  return data.data;
};

export default getUserInvitations;