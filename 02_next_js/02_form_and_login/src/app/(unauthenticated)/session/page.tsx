"use client";

import { LoginForm } from "@/components/forms/login-form";
import { RegisterForm } from "@/components/forms/register-form";
import { useState } from "react";

export enum SessionForm {
  LOGIN = "login",
  REGISTER = "register",
}

export default function SessionPage() {
  const [form, setForm] = useState<SessionForm>(SessionForm.LOGIN);

  return (
    <div className='w-1/2 max-w-[600px] flex flex-col items-center'>
      <h1 className='w-full capitalize mb-8 font-bold text-3xl'>
        {form === SessionForm.LOGIN ? SessionForm.LOGIN : SessionForm.REGISTER}
      </h1>
      {form === SessionForm.LOGIN ? (
        <LoginForm setForm={setForm} />
      ) : (
        <RegisterForm setForm={setForm} />
      )}
    </div>
  );
}
