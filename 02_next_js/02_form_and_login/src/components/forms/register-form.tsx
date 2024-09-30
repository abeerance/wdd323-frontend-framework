"use client";

import { SessionForm } from "@/app/(unauthenticated)/session/page";
import { Dispatch, SetStateAction, useState } from "react";
import { FormWrapper } from "./form-wrapper";
import { TextInput } from "../common/text-input";
import { Button } from "../common/button";

interface RegisterFormProps {
  setForm: Dispatch<SetStateAction<SessionForm>>;
}

export const RegisterForm = ({ setForm }: RegisterFormProps) => {
  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
  });

  return (
    <FormWrapper>
      <TextInput
        placeholder='E-mail'
        name='email'
        type='email'
        onChange={(e) => setRegisterDetails({ ...registerDetails, email: e.target.value })}
        className='mb-6'
      />
      <TextInput
        placeholder='Password'
        name='password'
        type='password'
        onChange={(e) => setRegisterDetails({ ...registerDetails, password: e.target.value })}
        className='mb-6'
      />
      <div className='flex gap-1 justify-end'>
        <p>Already a member?</p>
        <Button onClick={() => setForm(SessionForm.LOGIN)} isSimple className='mb-8'>
          Login now
        </Button>
      </div>
      <Button
        onClick={() => {
          console.log(registerDetails);
        }}
      >
        Register
      </Button>
    </FormWrapper>
  );
};
