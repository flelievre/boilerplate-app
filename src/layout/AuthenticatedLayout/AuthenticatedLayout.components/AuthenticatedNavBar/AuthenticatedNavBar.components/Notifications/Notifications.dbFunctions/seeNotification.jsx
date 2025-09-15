import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';

const seeNotification = async ({
  notificationId,
}) => (
  axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/notifications/${notificationId}`, {
    seen: true,
  })
);

export default seeNotification;
