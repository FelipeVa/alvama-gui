import api from '@/utils/fetcher';

export const auth = {
  login: async (
    email: string,
    password: string,
  ): Promise<{ access_token: string }> => {
    return (await api.post('/auth/login', { email, password })).data;
  },
};
