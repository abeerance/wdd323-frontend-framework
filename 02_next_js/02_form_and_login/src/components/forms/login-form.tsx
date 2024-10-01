"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "../common/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SessionForm } from "@/app/(unauthenticated)/session/page";
import { FormWrapper } from "./form-wrapper";
import { TextInput } from "../common/text-input";

interface LoginFormProps {
  setForm: Dispatch<SetStateAction<SessionForm>>;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = ({ setForm }: LoginFormProps) => {
  const methods = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput placeholder='E-mail' name='email' type='text' required validateAs='email' />
        <TextInput
          placeholder='Password'
          name='password'
          type='password'
          required
          validateAs='password'
        />
        <div className='flex gap-1 justify-end -mt-6'>
          <p>Don&apos;t have an account?</p>
          <Button onClick={() => setForm(SessionForm.REGISTER)} isSimple className='mb-8'>
            Register now
          </Button>
        </div>
        <Button type='submit'>Login</Button>
      </FormWrapper>
    </FormProvider>
  );
};
