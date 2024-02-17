import Axios from 'axios';

import storage from '../utils/storage';

const API_URL = `https://${window.REACT_APP_API_DOMAIN}`;

function authRequestInterceptor(config) {
  const token = storage.auth.getToken();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log(message);

    return Promise.reject(error);
  }
);
