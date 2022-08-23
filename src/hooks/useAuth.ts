import { useAuthStore } from '@/global-stores/auth.store';
import shallow from 'zustand/shallow';
import { useTypeSafeMutation } from '@/hooks/useTypeSafeMutation';
import {
  useLocation,
  useNavigate,
  Location as ReactLocation,
} from 'react-router-dom';
import { useState } from 'react';
import api from '@/utils/fetcher';

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

  const { token, setToken } = useAuthStore(
    state => ({
      token: state.token,
      setToken: state.setToken,
    }),
    shallow,
  );

  const { mutate, isLoading, isSuccess, isError } = useTypeSafeMutation(
    'login',
    {
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
    },
  );

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setError(null);
    await mutate([email, password]);
  };

  return {
    token,
    login,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
