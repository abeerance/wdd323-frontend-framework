import { ReactNode } from "react";
import { FormControl, FormItem } from "../ui/form";

interface FormInputProps {
  children: ReactNode;
}

export const FormInput = ({ children }: FormInputProps) => {
  return (
    <FormItem>
      <FormControl>{children}</FormControl>
    </FormItem>
  );
};
