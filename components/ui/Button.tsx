import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variation: 'formButton' | 'otherVariation'; // Add more variations as needed
  children: ReactNode;
}

const variations = {
  formButton:
    'w-full rounded-md bg-orange-400 p-3 text-center text-white ring-0 hover:bg-orange-500 active:bg-orange-600',
  otherVariation: '...', // Add styles for other variations
  // Add more variations as needed
};

const Button: React.FC<ButtonProps> = ({ variation, children, ...rest }) => {
  const buttonStyles = variations[variation] || ''; // Default to an empty string if the variation is not found

  return (
    <button className={buttonStyles} {...rest}>
      {children}
    </button>
  );
};

export default Button;
