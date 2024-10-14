"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../common/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SessionForm } from "@/app/(unauthenticated)/session/page";
import { FormWrapper } from "./form-wrapper";
import { TextInput } from "../common/text-input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  setForm: Dispatch<SetStateAction<SessionForm>>;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = ({ setForm }: LoginFormProps) => {
  const router = useRouter();
  const methods = useForm<LoginFormInputs>();
  const [error, setError] = useState<string | null>(null); // state for error handling

  console.log(error);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // we define here, that we will use next-auth's handleLogin
    // the handleLogin function of next-auth is called signIn()
    const result = await signIn("credentials", {
      redirect: false, // prevents the automatic redirect
      email: data.email,
      password: data.password,
    });

    // handle success of error based on the result
    if (result?.error) {
      setError("Login failed, please try again");
      console.error(result.error);
    } else {
      console.log("Login successful, ", result);
      router.push("/dashboard");
    }
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
