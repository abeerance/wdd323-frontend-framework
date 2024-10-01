"use client";

import { SessionForm } from "@/app/(unauthenticated)/session/page";
import { Dispatch, SetStateAction } from "react";
import { FormWrapper } from "./form-wrapper";
import { TextInput } from "../common/text-input";
import { Button } from "../common/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface RegisterFormProps {
  setForm: Dispatch<SetStateAction<SessionForm>>;
}

interface RegisterFormInputs {
  email: string;
  password: string;
}

export const RegisterForm = ({ setForm }: RegisterFormProps) => {
  const methods = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
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
          <p>Already a member?</p>
          <Button onClick={() => setForm(SessionForm.LOGIN)} isSimple className='mb-8'>
            Login now
          </Button>
        </div>
        <Button type='submit'>Register</Button>
      </FormWrapper>
    </FormProvider>
  );
};
