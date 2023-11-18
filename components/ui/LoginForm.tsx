'use client';
import React, { ChangeEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import FormRow from '@/components/ui/FormRow';
import toast from 'react-hot-toast';
import getTranslator from '../../services/getTranslator';
import Spinner from './Spinner';
import Button from './Button';

type Props = {
  setUser: any;
};
type Event = ChangeEvent<HTMLInputElement>;

// async function getTranslators(query: any) {
//   try {
//     const res = await fetch(
//       `api/translators?email=${encodeURIComponent(query)}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     if (res.ok) {
//       const data = await res.json();
//       return data;
//     } else {
//       throw new Error('user not found');
//     }
//   } catch (err: any) {
//     if (err instanceof Error) {
//       throw new Error('There is no such user in our database');
//     } else {
//       throw new Error('An unknown error occurred');
//     }
//   }
// }

const LoginForm = (props: Props) => {
  const [email, setEmail] = useState('pesnja25@gmail.com');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !password) return;
    startTransition(async () => {
      try {
        const data = await getTranslator(email);
        toast.success(data.msg);
        router.push('/dashboard');
      } catch (err: any) {
        toast.error(err.message);
        setErrors({ ...errors, email: err.message });
      }
    });
  };

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
        type='text'
        name='email'
        value={email}
        onChange={handleInputChange}
      />
      <FormRow
        id='password'
        type='password'
        name='password'
        value={password}
        onChange={handleInputChange}
      />
      <Button type='submit' variation='formButton'>
        {isPending ? (
          <span className='flex h-[24px] items-center justify-center'>
            <Spinner /> Sending
          </span>
        ) : (
          'Log in'
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
