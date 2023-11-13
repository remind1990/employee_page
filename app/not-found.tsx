import Link from 'next/link';
import React from 'react';

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-slate-50 to-slate-300'>
      <div className='flex w-[400px] h-[100px] bg-white justify-center items-center flex-col'>
        <h1>Page not Found</h1>
        <Link href='./'>⬅ Go Back</Link>
      </div>
     
    </div>
  );
};

export default NotFound;
