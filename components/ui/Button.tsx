import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variation?: 'formButton' | 'primary';
  disabled?: boolean;
  children: ReactNode;
}

const variations = {
  primary:
    'rounded-md bg-orange-400 p-3 text-center text-white ring-0 hover:bg-orange-500 active:bg-orange-600',
  formButton:
    'w-full rounded-md bg-orange-400 p-3 text-center text-white ring-0 hover:bg-orange-500 active:bg-orange-600',
  otherVariation: '...',
};

const Button: React.FC<ButtonProps> = ({
  variation = 'primary',
  disabled,
  children,
  ...rest
}) => {
  const buttonStyles = variations[variation] || '';

  return (
    <button className={buttonStyles} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
