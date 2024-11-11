"use client";

import { ReactNode } from "react";
import { FormControl, FormItem, FormMessage } from "../ui/form";
import { FieldErrors } from "react-hook-form";

interface FormInputProps {
  errors: FieldErrors;
  children: ReactNode;
}

export const FormInput = ({ errors, children }: FormInputProps) => {
  return (
    <FormItem>
      <FormControl>{children}</FormControl>
      {errors && <FormMessage />}
    </FormItem>
  );
};
