"use client";

import { LoginForm } from "@/components/forms/login-form";
import { RegisterForm } from "@/components/forms/register-form";
import { FormContext } from "@/types/enums/form-context";
import { useState } from "react";

export default function SessionPage() {
  const [formContext, setFormContext] = useState<FormContext>(FormContext.LOGIN);

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full max-w-[600px] flex flex-col'>
        <h1 className='text-2xl font-bold mb-6'>
          {formContext === FormContext.LOGIN ? "Welcome back!" : "Ready to register?"}
        </h1>
        {formContext === FormContext.LOGIN && <LoginForm setFormContext={setFormContext} />}
        {formContext === FormContext.REGISTER && <RegisterForm setFormContext={setFormContext} />}
      </div>
    </div>
  );
}
