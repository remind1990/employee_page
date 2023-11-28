import React from 'react';
import { whiteCoverCSSClasses } from '@/app/constants/constants';

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <main
      className={`flex h-full w-full flex-1 items-center justify-end bg-cover bg-no-repeat p-6 ${whiteCoverCSSClasses}`}
      style={{ backgroundImage: 'url(/about.jpg)' }}
    >
      <div className='z-10 max-w-xl animate-attractAttention rounded-md bg-white bg-opacity-90 bg-cover bg-no-repeat p-6 shadow-levitate'>
        <h1 className='text-center text-3xl text-black'>
          Hello dear coworkers! For us, as employers, it has always been
          important to uphold fair principles in our collaboration with you.
          That is why we decided to create this small app, which can assist you
          in tracking your progress every day and keeping it visible.
        </h1>
      </div>
      {/* <div className='custom-shape-divider-top justify-self-end'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
          className='divider-top'
        >
          <path
            d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
            className='shape-fill'
          ></path>
        </svg>
        <div className='absolute left-0 top-40 flex w-full'>
          <div className='special-border relative grid  min-h-[200px] max-w-[70%]  grid-cols-[200px,1fr]  bg-[#ffffff9a;] p-4'>
            <Image
              src='/woman.png'
              alt='client'
              width={200}
              height={500}
              priority={false}
              className='absolute left-[-24px] top-[-100px]'
            />
            <h1 className='col-start-2 font-roboto text-xl text-slate-800'>
              ❝For us as for employer it was always important to keep fair
              principals in our job with you, that is why we decided to make
              this small app, that could help you keep your progress everyday in
              front of your eyes's❞
            </h1>
          </div>
        </div>
      </div> */}
    </main>
  );
};

export default AboutPage;
