import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { loginSchema } from '@/schemas/login.schema';
import { Alert } from '@/components';
import logo_icon from '@/assets/images/alvama_icon.png';
import { LoginForm } from '@/pages/login/components';
import { XCircleIcon } from '@heroicons/react/outline';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const { login, error, isError, isLoading } = useAuth();
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<LoginFormValues> = data => {
    login(data);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-24 w-auto" src={logo_icon} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {isError ? (
              <Alert
                className="bg-red-100 p-4 text-red-700 dark:bg-red-200 dark:text-red-800"
                icon={XCircleIcon}
              >
                <div>{error}</div>
              </Alert>
            ) : null}
            <LoginForm
              control={control}
              isLoading={isLoading}
              onSubmit={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
