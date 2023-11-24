'use client';
import { useAuth } from '@/contexts/authContext';
import getTranslator from '@/services/getTranslator';
import updateTranslator from '@/services/updateTranslator';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import Button from './Button';
import FormRow from './FormRow';
import Spinner from './Spinner';

type Props = {};
type Event = ChangeEvent<HTMLInputElement>;

const SignUpForm = (props: Props) => {
  const { userExist, user, isRegistered, commitThatUserExist } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isRegistered) {
      router.push('/login');
    }
  }, [isRegistered]);

  function handleInputChange(e: Event): void {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword((state: string) => value);
    }
    if (name === 'email') {
      setEmail((state: string) => value);
    }
    if (name === 'passwordConfirm') {
      setPasswordConfirm((state: string) => value);
    }
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (!email) return;

    if (email && !userExist) {
      startTransition(async () => {
        try {
          const res = await getTranslator(email, true);
          toast.success(res.msg);
          commitThatUserExist(res.data);
        } catch (err: any) {
          toast.error(err.message);
        }
      });
    }

    if (userExist) {
      if (!password || !passwordConfirm) {
        toast.error('Please enter both password and password confirmation');
      } else if (password !== passwordConfirm) {
        toast.error('Password does not match the confirmation');
      } else if (password.length < 4) {
        toast.error('Password must be at least 4 characters long');
      } else {
        startTransition(async () => {
          try {
            const data = await updateTranslator(user._id, { email, password });
            toast.success(data.msg);
            router.push('/login');
          } catch (err: any) {
            console.error(err.message);
          }
        });
      }
    }
  }
  return (
    <form
      className='flex-column w-full gap-4 p-4 font-mono'
      onSubmit={handleSubmit}
    >
      {!userExist ? (
        <FormRow
          id='email'
          type='text'
          name='email'
          value={email}
          onChange={handleInputChange}
        />
      ) : (
        <>
          <FormRow
            id='password'
            type='password'
            name='password'
            value={password}
            disabled={isRegistered}
            onChange={handleInputChange}
          />
          <FormRow
            id='passwordConfirm'
            type='password'
            name='passwordConfirm'
            value={passwordConfirm}
            disabled={isRegistered}
            onChange={handleInputChange}
          />
        </>
      )}
      <Button type='submit' variation='formButton' disabled={isRegistered}>
        {isPending ? (
          <span className='flex h-[24px] items-center justify-center'>
            <Spinner />
          </span>
        ) : userExist ? (
          'Register'
        ) : (
          'Check in'
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;
