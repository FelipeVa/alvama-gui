import create from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    persist(
      set => ({
        token: null,
        setToken: (token: string) => set(state => ({ ...state, token })),
        removeToken: () => set(state => ({ ...state, token: null })),
      }),
      {
        name: 'auth-storage', // name of item in the storage (must be unique)
      },
    ),
  ),
);
