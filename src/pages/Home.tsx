import React, { FormEventHandler } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import Input from '@/components/form/Input';

type FormValues = {
  routes: Array<{
    firstName: string;
    lastName: string;
  }>;
};

const Home = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      routes: [{ firstName: 'Bill', lastName: 'Luo' }],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: 'routes', // unique name for your Field Array
    },
  );

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <Input<FormValues>
          key={index}
          type="text"
          name={`routes.${index}.firstName`}
          control={control}
        />
      ))}

      <button
        type="button"
        onClick={() => {
          append({ firstName: 'appendBill', lastName: 'appendLuo' });
        }}
      >
        append
      </button>
      <button type="submit">submit</button>
    </form>
  );
};

export default Home;
