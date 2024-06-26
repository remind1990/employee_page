'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from './Logo';
import { useAuth } from '@/contexts/authContext';
import Button from './Button';

type Props = {
  variant?: 'light' | 'dark';
};

export default function Header({ variant = 'light' }: Props) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };
  const dark = pathname === '/dashboard';
  const textColorClass = !dark ? '' : 'text-white';
  return (
    <header
      className={`flex flex-row flex-wrap items-center justify-between gap-0 bg-stone-100 p-4 font-mono md:justify-start md:gap-4 ${textColorClass} z-10 shadow-md`}
    >
      <Link href='/'>
        <Logo width={80} height={70} />
      </Link>
      <Link
        href='/about'
        className={`header-link text-center ${
          isActive('/about') ? 'link' : ''
        }`}
      >
        About
      </Link>
      <Link
        href='/contacts'
        className={`header-link text-center ${
          isActive('/contacts') ? 'link' : ''
        }`}
      >
        Contacts
      </Link>
      {isAuthenticated && (
        <Link
          href='/dashboard'
          className={`header-link text-center ${
            isActive('/dashboard') ? 'link' : ''
          }`}
        >
          Dashboard
        </Link>
      )}

      {isAuthenticated && (
        <Link
          href='/converter'
          className={`header-link text-center ${
            isActive('/converter') ? 'link' : ''
          }`}
        >
          Image Converter
        </Link>
      )}
      {isAuthenticated && (
        <Link
          href='https://chat.openai.com/'
          target='_blank'
          rel='noopener noreferrer'
          className={`header-link text-center ${
            isActive('/gpt') ? 'link' : ''
          }`}
        >
          Chat GPT
        </Link>
      )}
      <div className={`ml-auto grid  justify-self-end`}>
        {!isAuthenticated ? (
          <Link
            href='/login'
            className={`header-link  ${isActive('/login') ? 'link' : ''}`}
          >
            Log In
          </Link>
        ) : (
          <Button
            onClick={() => {
              logout();
              router.replace('/');
            }}
            className={`header-link text-center`}
          >
            Log out
          </Button>
        )}
      </div>
    </header>
  );
}
