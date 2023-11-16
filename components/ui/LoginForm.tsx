'use client';
import FormRow from '@/components/ui/FormRow';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {};
async function getTranslators() {
  try {
    const res = await fetch('api/translators', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    toast.success('Succes');
    const data = await res.json();
    console.log(data);
  } catch (err: any) {
    if (err instanceof Error) {
      toast.error(`Error: ${err.message}`);
    } else {
      // Handle other types of errors or unknown errors
      toast.error('An unknown error occurred');
    }
  }
}
const LoginForm = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !password) return;
    getTranslators();
    // router.push('/dashboard');
  };
  type Event = ChangeEvent<HTMLInputElement>;

  function handleInputChange(e: Event): void {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword((state: string) => value);
    }
    if (name === 'email') {
      setEmail((state: string) => value);
    }
  }
  return (
    <form
      className='flex-column  w-full gap-4  p-4  font-mono'
      onSubmit={handleSubmit}
    >
      <FormRow
        id='email'
        type='email'
        name='email'
        value={email}
        onChange={handleInputChange}
      />
      <FormRow
        id='password'
        type='text'
        name='password'
        value={password}
        onChange={handleInputChange}
      />
      <button
        type='submit'
        className='w-full rounded-md bg-orange-400
          p-3 text-center text-white
          ring-0
          hover:bg-orange-500 
          active:bg-orange-600'
      >
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
