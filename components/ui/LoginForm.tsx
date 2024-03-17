'use client';
import React, { ChangeEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import FormRow from '@/components/ui/FormRow';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import Button from './Button';
import loginTranslator from '@/services/loginTranslator';
import { useAuth } from '@/contexts/authContext';
import { LoginServiceMessages } from '@/services/enums';

type Event = ChangeEvent<HTMLInputElement>;

const LoginForm = () => {
  const { login, mongooseLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !password) return;
    startTransition(async () => {
      try {
        const res = await loginTranslator({ email, password });
        toast.success(LoginServiceMessages.Success);
        login(res.data);
        mongooseLogin(res.mongooseData);
        router.push('/dashboard');
      } catch (err: any) {
        toast.error(err.message);
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
      className='flex-column w-full gap-4 p-4  font-mono'
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
        type='password'
        name='password'
        value={password}
        onChange={handleInputChange}
      />
      <Button type='submit' variation='formButton' disabled={isPending}>
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
