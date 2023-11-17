'use client';
import { useAuth } from '@/contexts/authContext';
import getTranslator from '@/services/getTranslator';
import React, { ChangeEvent, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import Button from './Button';
import FormRow from './FormRow';
import Spinner from './Spinner';

type Props = {};
type Event = ChangeEvent<HTMLInputElement>;

const SignupForm = (props: Props) => {
  const { userExist, commitThatUserExist } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState('pesnja25@gmail.com');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

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
          const data = await getTranslator(email, true);
          toast.success(data.msg);
          commitThatUserExist();
        } catch (err: any) {
          toast.error(err.message);
        }
      });
    }

    if (userExist) {
      if (!password || !passwordConfirm) return;
      if (password !== passwordConfirm) {
        toast.error('password does not match');
      } else {
        console.log('lets move on');
      }
    }
  }
  return (
    <form
      className='flex-column  w-full gap-4  p-4  font-mono'
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
            onChange={handleInputChange}
          />
          <FormRow
            id='passwordConfirm'
            type='password'
            name='passwordConfirm'
            value={passwordConfirm}
            onChange={handleInputChange}
          />
        </>
      )}
      <Button type='submit' variation='formButton'>
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

export default SignupForm;
