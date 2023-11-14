'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <header className='grid grid-cols-2  items-center  gap-4 bg-stone-100 p-4 font-mono'>
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
      <div className='grid justify-self-end'>
        <Link
          href='/login'
          className={`header-link  ${isActive('/login') ? 'link' : ''}`}
        >
          Log In
        </Link>
      </div>
    </header>
  );
}
