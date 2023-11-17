'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import Header from './ui/Header';
import LoginForm from './ui/LoginForm';
import Logo from './ui/Logo';
import SignupForm from './ui/SignupForm';

type Props = {};

const LoginPage = (props: Props) => {
  const pathname = usePathname();
  return (
    <>
      <Header variant='light' />
      <main className='flex h-screen items-center justify-center'>
        <div className='flex-column w-[400px] gap-2 rounded-lg border-r-amber-200 bg-amber-50'>
          <div className='flex w-full flex-col items-center  gap-1  rounded-t-lg bg-gradient-to-r from-orange-300 via-orange-100 via-orange-50 to-amber-500'>
            <Logo />
            <h1 className='mb-4 font-mono text-xl'>
              {' '}
              Sunrise Employee {pathname === '/signin' ? 'Sign in' : 'Log In'}:
            </h1>
          </div>
          {pathname === '/signin' ? <SignupForm /> : <LoginForm />}
        </div>
      </main>
    </>
  );
};

export default LoginPage;
