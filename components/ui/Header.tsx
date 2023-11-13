import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className='grid grid-cols-2  items-center  gap-4 bg-stone-100 p-4 font-mono'>
      <div className='grid grid-cols-2 gap-2'>
        <Link href='/about' className='header-button text-center'>
          About
        </Link>
        <Link href='/contacts' className='header-button text-center'>
          Contacts
        </Link>
      </div>
      <div className='grid justify-self-end'>
        <Link href='/login' className='header-button'>
          Log In
        </Link>
      </div>
    </header>
  );
}
