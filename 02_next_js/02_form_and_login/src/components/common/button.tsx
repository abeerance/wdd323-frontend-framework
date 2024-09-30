interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isSimple?: boolean;
  className?: string;
}

export const Button = ({ isSimple, children, onClick, className }: ButtonProps) => {
  const baseClass = isSimple
    ? "text-black font-semibold hover:text-gray-800 bg-transparent border-none"
    : "text-white bg-purple-600 text-xl font-bold py-2.5 px-5 rounded";

  return (
    <button className={`${baseClass} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
