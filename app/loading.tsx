import React from 'react';
import Spinner from '../components/ui/Spinner';

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className='flex h-screen items-center justify-center backdrop-blur'>
      <div className='h-20 w-20 rounded-lg p-4'>
        <Spinner />
      </div>
    </div>
  );
};

export default Loading;
