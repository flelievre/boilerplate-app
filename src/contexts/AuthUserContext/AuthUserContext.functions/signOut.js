import {
  axios,
  VITE_AUTH_URL,
} from '@/config';

const signOut = async () => {
  console.log('signOut');
  try {
    await axios.requestWithAuth('post', `${VITE_AUTH_URL}/auth/sign-out`, {}, { withCredentials: true });
  } catch (e) {
    console.log('signOut error', e);
  } finally {
    localStorage.removeItem('jwe');
    window.dispatchEvent(new Event('jwe'));
  }
};

export default signOut;
