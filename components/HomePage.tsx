import React from 'react';
import Header from './ui/Header';
import StartNowBox from './ui/StartNowBox';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <section
      className='relative flex h-full w-full flex-1 flex-col gap-8 bg-cover bg-center bg-no-repeat py-4 md:p-4'
      style={{ backgroundImage: 'url(/bg-2.jpg)' }}
    >
      <div className='backdrop-blur-1 absolute inset-0 flex flex-col gap-8 bg-white bg-opacity-20 ' />
      <StartNowBox />
    </section>
  );
};

export default HomePage;
