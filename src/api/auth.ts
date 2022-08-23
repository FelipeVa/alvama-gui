import api from '@/utils/fetcher';
import { UserType } from '@/types/auth.type';

export const auth = {
  login: async (
    email: string,
    password: string,
  ): Promise<{ access_token: string }> => {
    return (await api.post('/auth/login', { email, password })).data;
  },

  me: async (): Promise<UserType> => {
    return (await api.get('/auth/me')).data;
  },

  logout: async (): Promise<void> => {
    await api.delete('/auth/logout');
  },
};
