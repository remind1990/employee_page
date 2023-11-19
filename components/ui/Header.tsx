'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from './Logo';
import { useAuth } from '@/contexts/authContext';
import Button from './Button';

type Props = {
  variant: 'light' | 'dark';
};

export default function Header({ variant = 'light' }: Props) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };

  const backgroundColorClass =
    variant === 'light'
      ? 'bg-stone-100'
      : 'bg-gradient-to-r from-stone-800 via-slate-300  via-slate-400 to-rose-500';
  const textColorClass = variant === 'light' ? '' : 'text-white';
  const gridCols = isAuthenticated
    ? 'grid-cols-[5rem,1fr,1fr,1fr]'
    : 'grid-cols-[5rem,1fr,1fr]';
  return (
    <header
      className={`grid ${gridCols} items-center gap-4 p-4 font-mono ${backgroundColorClass} ${textColorClass} shadow-md`}
    >
      <Link href='/'>
        <Logo width={80} height={70} />
      </Link>
      <div className='grid grid-cols-2 gap-2'>
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
      </div>
      {isAuthenticated && (
        <Link
          href='/dashboard'
          className={`header-link text-center ${
            isActive('/contacts') ? 'link' : ''
          }`}
        >
          Dashboard
        </Link>
      )}
      <div className='grid justify-self-end'>
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
