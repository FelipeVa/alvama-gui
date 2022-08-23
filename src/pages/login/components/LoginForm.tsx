import React, { FC } from 'react';
import { Button, Input } from '@/components/form';
import { LoginFormValues } from '@/types/login.type';
import { UseControllerProps } from 'react-hook-form';

interface LoginFormPropsI
  extends Required<Pick<UseControllerProps<LoginFormValues>, 'control'>> {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
}

const LoginForm: FC<LoginFormPropsI> = ({ onSubmit, control, isLoading }) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <Input<LoginFormValues>
          type="text"
          label="Email"
          name="email"
          placeholder="Email"
          control={control}
        />
      </div>

      <div>
        <Input<LoginFormValues>
          type="password"
          label="Password"
          name="password"
          placeholder="Password"
          control={control}
        />
      </div>

      <div>
        <Button
          type="submit"
          isLoading={isLoading}
          className="flex w-full justify-center bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
