"use client";

import { z } from "zod";
import { Button } from "../ui/button/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { FormContext } from "@/app/session/page";
import { FormInput } from "./form-input";

interface LoginFormProps {
  setFormContext: (context: FormContext) => void;
}

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(4, {
      message: "Password must be at least 4 characters",
    })
    .max(20, {
      message: "Password must be at most 20 characters",
    }),
});

export const LoginForm = ({ setFormContext }: LoginFormProps) => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const { errors } = form.formState;

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
  }

  return (
    <div className='flex flex-col w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full gap-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormInput errors={errors}>
                <Input placeholder='Email' {...field} />
              </FormInput>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormInput errors={errors}>
                <Input type='password' placeholder='Password' {...field} />
              </FormInput>
            )}
          />
          <Button type='submit' size='lg'>
            Login
          </Button>
        </form>
      </Form>
      <p className='mt-4 self-end'>
        Need an account?
        <span
          onClick={() => setFormContext(FormContext.REGISTER)}
          className='font-semibold ml-2 cursor-pointer'
        >
          Register now
        </span>
      </p>
    </div>
  );
};
