import axios from 'axios';
import {
  loadStripe,
} from '@stripe/stripe-js';
const {
  VITE_WEB_APP_URL,
  VITE_APP_NAME,
  VITE_AUTH_URL,
  VITE_BACKEND_URL,
  VITE_NODE_ENV,
  VITE_RECAPTCHA_SITEKEY,
  VITE_STRIPE_PUBLIC_KEY,
} = import.meta.env;

let isRefreshing = false;
let failedQueue = [];

axios.requestWithAuth = (method, url, data = {}, options = {}) => {
  const config = {
    method,
    url,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem('jwe')}`,
    },
    ...options,
  };

  if (['get', 'delete'].includes(method.toLowerCase())) {
    config.params = data;
  } else {
    config.data = data;
  }

  return axios(config);
};

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    // Erreur sans requête d'origine : rejette proprement
    if (!originalRequest) {
      const fallbackError = error?.response?.data?.error || { message: 'Network Error' };
      return Promise.reject(fallbackError);
    }

    const is401 = error?.response?.status === 401;

    if (!is401 || originalRequest._retry) {
      const formattedError = error?.response?.data?.error || { message: 'Network Error' };
      return Promise.reject(formattedError);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      }).catch((err) => {
        return Promise.reject(err);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const {
        data: {
          data: {
            jwe,
          },
        } = {},
      } = await axios.requestWithAuth('post', `${VITE_AUTH_URL}/auth/refresh-token`, {}, {
        withCredentials: true,
      });

      if (!jwe) throw new Error('No token returned');

      localStorage.setItem('jwe', jwe);
      window.dispatchEvent(new Event('jwe'));
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwe}`;
      processQueue(null, jwe);
      originalRequest.headers.Authorization = `Bearer ${jwe}`;
      return axios(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      localStorage.removeItem('jwe');
      window.dispatchEvent(new Event('jwe'));
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);


const stripe = loadStripe(VITE_STRIPE_PUBLIC_KEY);


const LOADING_TOAST_CONF = {
  autoClose: false,
  closeOnClick: false,
  draggable: false,
  closeButton: false,
}
const SHARED_TOAST_CONF = {
  position: 'bottom-right',
};

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

export {
  axios,
  VITE_APP_NAME,
  VITE_WEB_APP_URL,
  VITE_AUTH_URL,
  VITE_BACKEND_URL,
  LOADING_TOAST_CONF,
  SHARED_TOAST_CONF,
  VITE_NODE_ENV,
  VITE_RECAPTCHA_SITEKEY,
  ROWS_PER_PAGE_OPTIONS,
  stripe,
};

