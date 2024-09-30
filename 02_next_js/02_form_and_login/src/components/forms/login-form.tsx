"use client";

import { SessionForm } from "@/app/(unauthenticated)/session/page";
import { Dispatch, SetStateAction, useState } from "react";
import { TextInput } from "../common/text-input";
import { FormWrapper } from "./form-wrapper";
import { Button } from "../common/button";

interface LoginFormProps {
  setForm: Dispatch<SetStateAction<SessionForm>>;
}

export const LoginForm = ({ setForm }: LoginFormProps) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  return (
    <FormWrapper>
      <TextInput
        placeholder='E-mail'
        name='email'
        type='email'
        onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
        className='mb-6'
      />
      <TextInput
        placeholder='Password'
        name='password'
        type='password'
        onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
        className='mb-6'
      />
      <div className='flex gap-1 justify-end'>
        <p>Don&apos;t have an account?</p>
        <Button onClick={() => setForm(SessionForm.REGISTER)} isSimple className='mb-8'>
          Register now
        </Button>
      </div>
      <Button
        onClick={() => {
          console.log(loginDetails);
        }}
      >
        Login
      </Button>
    </FormWrapper>
  );
};
