import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';

const seeAllUnseenNotifications = async () => (
  axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/notifications/actions/seen`)
);

export default seeAllUnseenNotifications;
