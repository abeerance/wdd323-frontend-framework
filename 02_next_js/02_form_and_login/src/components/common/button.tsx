interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isSimple?: boolean;
  className?: string;
  type?: "submit" | "button";
}

export const Button = ({
  isSimple = false,
  children,
  onClick,
  className,
  type = "button",
}: ButtonProps) => {
  const baseClass = isSimple
    ? "text-black font-semibold hover:text-gray-800 bg-transparent border-none"
    : "text-white bg-purple-600 text-xl font-bold py-2.5 px-5 rounded";

  return (
    <button className={`${baseClass} ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
