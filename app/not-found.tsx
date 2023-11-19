import Link from 'next/link';
import React from 'react';
import { TbArrowBigLeftFilled } from 'react-icons/tb';

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div
      className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-60 backdrop-blur backdrop-filter'
      style={{ zIndex: 1000 }}
    >
      <div className='flex h-screen w-screen items-center justify-center'>
        <div className='shadow-levitate animate-attractAttention flex w-[90%] max-w-[400px] flex-col items-center justify-center gap-6 rounded-md bg-white p-6'>
          <h1 className='text-2xl text-stone-800'>Page not Found</h1>

          <Link
            href='./'
            className='flex items-center gap-4 text-2xl text-stone-800 hover:text-blue-500'
          >
            <TbArrowBigLeftFilled /> Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
