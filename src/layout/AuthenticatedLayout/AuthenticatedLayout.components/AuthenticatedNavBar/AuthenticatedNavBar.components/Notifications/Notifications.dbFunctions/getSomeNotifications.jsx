import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';

const getSomeNotifications = async ({
  skip = 0,
} = {}) => (
  axios.requestWithAuth('get', `${VITE_BACKEND_URL}/notifications?skip=${skip}`)
);

export default getSomeNotifications;
