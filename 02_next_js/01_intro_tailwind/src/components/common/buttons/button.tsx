import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className='bg-white hover:bg-blue-700 text-black hover:text-white text-2xl font-bold py-2.5 px-5 rounded'
      onClick={onClick}
    >
      {children}
    </button>
  );
};
