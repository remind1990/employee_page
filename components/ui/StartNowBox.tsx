import React from 'react';
import Logo from './Logo';
import Link from 'next/link';

type Props = {};

const StartNowBox = (props: Props) => {
  return (
    <div className='flex-column shadow-levitate animate-attractAttention z-10 mx-auto w-[90%] max-w-[450px] gap-4 rounded-xl bg-gradient-to-t from-stone-700 to-stone-900 px-6 py-6 md:mx-0'>
      <Logo />
      <h1 className='text-center font-roboto text-3xl text-slate-100'>
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
        href='/signin'
        className='header-link  bg-amber-500 font-mono text-xl text-slate-100 hover:text-black'
      >
        Start Now
      </Link>
    </div>
  );
};

export default StartNowBox;
