import create from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    persist(
      set => ({
        token: null,
        setToken: (token: string) => set(state => ({ ...state, token })),
      }),
      {
        name: 'auth-storage', // name of item in the storage (must be unique)
      },
    ),
  ),
);
