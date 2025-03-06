import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary"; 
}

const MyButton: React.FC<ButtonProps> = ({
  children,
  variant = "primary", 
  ...props
}) => {

  const baseStyles = "w-32 h-12 rounded-3xl text-white transition-colors  duration-300";

  const variantStyles =
    variant === "secondary"
      ? "bg-gray-400 hover:bg-gray-500"
      : "bg-green-500 hover:bg-green-600";

  return (
    <button {...props} className={`${baseStyles} ${variantStyles}`}>
      {children}
    </button>
  );
};

export default MyButton;
