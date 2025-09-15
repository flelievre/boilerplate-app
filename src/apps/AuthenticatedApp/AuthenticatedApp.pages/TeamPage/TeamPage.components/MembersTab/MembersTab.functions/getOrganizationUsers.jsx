import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';

const getOrganizationUsers = async ({
  isAuthorized = false,
  organizationId,
  search = '',
  limit = 10,
  order = 'createdAt',
  orderBy = 'desc',
  skip = 0,
}) => {
  if (!isAuthorized) {
    return {
      collection: [],
      counts: {},
    };
  }
  const {
    data,
  } = await axios.requestWithAuth('get', `${VITE_BACKEND_URL}/organizations/${organizationId}/users`, {
      search,
      limit,
      order,
      orderBy,
      skip,
  });
  return data.data;
};

export default getOrganizationUsers;
