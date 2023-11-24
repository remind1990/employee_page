'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import { whiteCoverCSSClasses } from '@/app/constants/constants';
import LoginForm from './ui/LoginForm';
import Logo from './ui/Logo';
import SignUpForm from './ui/SignUpForm';

type Props = {};

const AuthorizationPage = (props: Props) => {
  const pathname = usePathname();
  return (
    <main
      className={`flex h-screen items-center justify-center ${whiteCoverCSSClasses}`}
      style={{ backgroundImage: "url('/main-background.jpg')" }}
    >
      <div className='flex-column z-10 w-[90%] max-w-[400px] rounded-lg border-r-amber-200 bg-amber-50 shadow-levitate'>
        <div className='flex w-full flex-col items-center  gap-1  rounded-t-lg bg-gradient-to-r from-orange-300 via-orange-100 via-orange-50 to-amber-500'>
          <Logo />
          <h1 className='mb-4 font-mono text-xl text-black'>
            Sunrise Employee {pathname === '/signin' ? 'Sign in' : 'Log In'}:
          </h1>
        </div>
        {pathname === '/signin' ? <SignUpForm /> : <LoginForm />}
      </div>
    </main>
  );
};

export default AuthorizationPage;
