import Link from 'next/link';
import React from 'react';
import { TbArrowBigLeftFilled } from 'react-icons/tb';

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-transparent backdrop-blur backdrop-filter'>
      <div className='flex h-screen items-center justify-center'>
        <div className='flex  w-[400px] flex-col items-center justify-center gap-6 rounded-md bg-gradient-to-b from-stone-100 to-stone-400 p-4'>
          <h1 className='text-2xl text-stone-800'>Page not Found</h1>

          <Link
            href='./'
            className='flex flex-wrap items-center text-2xl text-stone-800'
          >
            <TbArrowBigLeftFilled /> Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
