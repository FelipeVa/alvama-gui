import axios from 'axios';
import { useAuthStore } from '@/global-stores/auth.store';

const api = axios.create({
  baseURL: 'http://localhost:6969',
});

api.interceptors.request.use(config => {
  let token = null;
  useAuthStore.subscribe(
    state => state.token,
    selectedState => {
      token = `Bearer ${selectedState}`;
    },
    {
      fireImmediately: true,
    },
  );

  if (token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.headers.Authorization = token;
  }

  return config;
});

export default api;
