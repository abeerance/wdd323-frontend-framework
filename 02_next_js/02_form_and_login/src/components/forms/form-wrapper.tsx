"use client";

import { FormEvent, ReactNode } from "react";

interface FormWrapperProps {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const FormWrapper = ({ children, onSubmit }: FormWrapperProps) => {
  return (
    <form className='flex flex-col w-full' onSubmit={onSubmit}>
      {children}
    </form>
  );
};
