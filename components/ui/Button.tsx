import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variation?: 'formButton' | 'primary';
  disabled?: boolean; // Add more variations as needed
  children: ReactNode;
}

const variations = {
  primary:
    'rounded-md bg-orange-400 p-3 text-center text-white ring-0 hover:bg-orange-500 active:bg-orange-600',
  formButton:
    'w-full rounded-md bg-orange-400 p-3 text-center text-white ring-0 hover:bg-orange-500 active:bg-orange-600',
  otherVariation: '...', // Add styles for other variations
  // Add more variations as needed
};

const Button: React.FC<ButtonProps> = ({
  variation = 'primary',
  disabled,
  children,
  ...rest
}) => {
  const buttonStyles = variations[variation] || ''; // Default to an empty string if the variation is not found

  return (
    <button className={buttonStyles} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
