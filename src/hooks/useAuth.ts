import { useAuthStore } from '@/global-stores/auth.store';
import shallow from 'zustand/shallow';
import { useTypeSafeMutation } from '@/hooks/useTypeSafeMutation';
import {
  Location as ReactLocation,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useState } from 'react';

export interface Location<State> extends Omit<ReactLocation, 'state'> {
  state: State;
}

export type LocationState = {
  from?: {
    [key: string]: string;
  };
};

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation() as Location<LocationState>;

  const { token, setToken, removeToken } = useAuthStore(
    state => ({
      token: state.token,
      setToken: state.setToken,
      removeToken: state.removeToken,
    }),
    shallow,
  );

  const {
    mutate: onLogin,
    isLoading: isLoggingIn,
    isSuccess: isLoggedIn,
    isError: isLoginError,
  } = useTypeSafeMutation('login', {
    onSuccess: ({ access_token }) => {
      setToken(access_token);

      const origin = location.state.from?.pathname || '/';
      navigate(origin);
    },
    onError: err => {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      }
    },
  });

  const {
    mutate: onLogout,
    isLoading: isLoggingOut,
    isSuccess: isLoggedOut,
    isError: isLogoutError,
  } = useTypeSafeMutation('logout', {
    onSuccess: () => {
      removeToken();

      navigate('/login');
    },
    onError: err => {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      }
    },
  });

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setError(null);
    await onLogin([email, password]);
  };

  const logout = async () => {
    setError(null);
    await onLogout([]);
  };

  return {
    token,
    login,
    logout,
    isLoading: isLoggingIn || isLoggingOut,
    isSuccess: isLoggedIn || isLoggedOut,
    isError: isLoginError || isLogoutError,
    error,
  };
};
