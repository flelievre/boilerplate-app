
import {
  axios,
  VITE_AUTH_URL,
} from '@/config';
import signOut from './signOut.js';

const renewJwe = async () => {
  const {
    data: {
      data: {
        jwe,
      },
    } = {},
  } = await axios.requestWithAuth('post', `${VITE_AUTH_URL}/auth/refresh-token`, {}, {
    withCredentials: true,
  });
  if (jwe) {
    localStorage.setItem('jwe', jwe);
    window.dispatchEvent(new Event('jwe'));
  } else {
    signOut();
  }
};

export default renewJwe;
