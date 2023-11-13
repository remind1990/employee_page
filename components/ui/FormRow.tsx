import React, { ChangeEvent } from 'react'

type Props = {
    id: string;
    type: 'text' | 'password' | 'number' | 'email';
    name: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormRow({id, type, name, value, onChange }: Props) {
  return (
    <div className='flex flex-col w-full'>
        <label htmlFor={id} >{name}:</label>
        <input id={id}
        className='ring-2 rounded-md p-2'
         type={type} 
         name={name}
         value={value}
         onChange={onChange}
         />
        </div>
  )
}