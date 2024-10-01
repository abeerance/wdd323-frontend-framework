"use client";

import clsx from "clsx";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps {
  placeholder: string; // placeholder text for the input field
  name: string; // the name of the field which react-hook-form uses to track the input
  type: string; // the HTML input type
  required?: boolean; // whether the input is required
  className?: string; // optional className for the input field
  validateAs?: "email" | "password" | "text"; // optional validation for the input field
}

export const TextInput = ({
  placeholder,
  name,
  type,
  required = false,
  className,
  validateAs = "text",
  ...rest
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieves the form context from react-hook-form -> parent component

  // Define validation rules based on the `validateAs` prop
  const validationRules = {
    // If required, display a required field message
    required: required && "This is a required field",

    // Email validation rule, checks if the input matches a standard email pattern
    ...(validateAs === "email" && {
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email address", // Error message for invalid email format
      },
    }),

    // Password validation rule, checks for a minimum length of 8 characters
    ...(validateAs === "password" && {
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters", // Error message for short password
      },
    }),
  };

  // retrieving of error message for this current field from react-hook-form
  // it's either undefined, when there is no error, of if there is an error, it will be the error message -> string
  const error = errors[name]?.message as string | undefined;

  return (
    <div className={clsx("w-full relative flex flex-col mb-8", className)}>
      <div className='flex border border-gray-600 rounded-md overflow-hidden'>
        <input
          type={type === "password" && showPassword ? "text" : type} // toggle password visibility
          placeholder={placeholder}
          className='w-full  h-12 p-2'
          {...register(name, validationRules)}
          {...rest}
        />
        {/*toggle of the visibiliy of passowrd */}
        {type === "password" && (
          <div
            className='absolute right-2 top-3 cursor-pointer'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <p>Hide</p> : <p>Show</p>}
          </div>
        )}
      </div>
      {/* conditional rendering of error message */}
      {error && <p className='text-red-600 text-sm mt-1 absolute top-[50px] left-0'>{error}</p>}
    </div>
  );
};
