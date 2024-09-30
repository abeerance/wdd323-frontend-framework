"use client";

import { Dispatch, SetStateAction } from "react";
import { TextInput } from "../common/text-input";
import { Button } from "../common/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { SessionForm } from "@/app/(unauthenticated)/session/page";

interface LoginFormProps {
  setForm: Dispatch<SetStateAction<SessionForm>>;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = ({ setForm }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
      <input
        {...register("email", { required: "Email is required" })}
        placeholder='E-mail'
        className='mb-6 p-2 w-full rounded-md border border-gray-600'
      />
      {errors.email && <p className='text-red-600 -mt-5 text-sm mb-4 '>{errors.email.message}</p>}
      <input
        {...register("password")}
        placeholder='Password'
        className='mb-6 p-2 w-full rounded-md border border-gray-600'
      />
      <div className='flex gap-1 justify-end'>
        <p>Don&apos;t have an account?</p>
        <Button onClick={() => setForm(SessionForm.REGISTER)} isSimple className='mb-8'>
          Register now
        </Button>
      </div>
      <Button type='submit'>Login</Button>
    </form>
  );
};
