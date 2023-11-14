import Image from 'next/image';
import React from 'react';
import Header from './ui/Header';

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <main className='grid grid-rows-[auto,3fr] gap-[10rem]'>
      <Header />
      <div className='relative grid min-h-[200px]  max-w-[70%] grid-cols-[200px,1fr]  justify-self-end rounded-lg bg-stone-800 p-4'>
        <Image
          src='/woman.png'
          alt='client'
          width={200}
          height={500}
          priority={false}
          className='absolute left-[-24px] top-[-100px]'
        />
        <h1 className='col-span-2 font-roboto text-xl text-slate-100'>
          ❝For us as for employer it was always important to keep fair
          principals in our job with you, that is why we decided to make this
          small app, that could help you keep your progress everyday in front of
          your eyes's❞
        </h1>
      </div>
    </main>
  );
};

export default AboutPage;
