"use client";

import { useState } from "react";

interface TextInputProps {
  placeholder: string;
  name: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const TextInput = ({ placeholder, name, type, onChange, className }: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`w-full h-12 relative flex border border-gray-600 rounded-md overflow-hidden ${className}`}
    >
      <input
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className='w-full h-full p-2'
      />
      {type === "password" && (
        <div
          className='absolute right-2 top-3 cursor-pointer'
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <p>Hide</p> : <p>Show</p>}
        </div>
      )}
    </div>
  );
};
