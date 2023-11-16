import React from 'react';
import Logo from './Logo';
import Link from 'next/link';

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className='flex-column  ml-8 h-[400px] w-[350px] justify-around gap-4 rounded-xl bg-gradient-to-t from-stone-700 to-stone-900 px-4 py-3 shadow-xl'>
      <Logo />
      <h1 className='font-roboto text-3xl text-slate-100'>
        Track your{' '}
        <span className='bg-gradient-to-b from-orange-300 to-orange-500 bg-clip-text text-transparent'>
          Progress
        </span>{' '}
        with the help of{' '}
        <span className='bg-gradient-to-t from-orange-300 to-orange-500 bg-clip-text text-transparent'>
          Sunrise Agency
        </span>
      </h1>
      <Link
        href='/login'
        className='header-link  bg-amber-500 font-mono text-xl text-slate-100 hover:text-black'
      >
        Start Now
      </Link>
    </div>
  );
};

export default Sidebar;
