"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button/button";
import { FormContext } from "@/app/session/page";
import { FormInput } from "./form-input";

interface RegisterFormProps {
  setFormContext: (context: FormContext) => void;
}

const registerFormSchema = z.object({
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

export const RegisterForm = ({ setFormContext }: RegisterFormProps) => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const { errors } = form.formState;

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
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
            Register
          </Button>
        </form>
      </Form>
      <p className='mt-4 self-end'>
        Already got an account?
        <span
          onClick={() => setFormContext(FormContext.LOGIN)}
          className='font-semibold ml-2 cursor-pointer'
        >
          Login now
        </span>
      </p>
    </div>
  );
};
