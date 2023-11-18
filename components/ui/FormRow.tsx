import React, { ChangeEvent } from 'react';

type Props = {
  id: string;
  type: 'text' | 'password' | 'number' | 'email';
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export default function FormRow({
  id,
  type,
  name,
  value,
  disabled,
  onChange,
}: Props) {
  return (
    <div className='flex w-full flex-col text-black '>
      <label htmlFor={id}>
        {name === 'passwordConfirm'
          ? 'Please confirm your password'
          : `Please enter your ${name}`}
        :
      </label>
      <input
        id={id}
        className=' rounded-md p-2 ring-2'
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}
