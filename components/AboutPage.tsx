import React from 'react';
import Header from './ui/Header';

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <main
      className='grid h-[100vh] grid-rows-[auto,3fr] bg-cover bg-center'
      style={{ backgroundImage: 'url(/about.jpg)' }}
    >
      <Header />
      <div className='relative'>
        <div className='absolute right-[17rem] max-w-xl sm:top-20 md:right-10 md:top-60 lg:top-40'>
          <h1
            className='bg-gradient-to-t from-amber-500  to-amber-900 bg-clip-text text-center
        font-mono text-4xl text-transparent 
        '
            style={{
              textShadow: '5px 4px 9px #101010',
            }}
          >
            ❝Hello dear Coworkers! For us as for employer it was always
            important to keep fair principals in our job with you, that is why
            we decided to make this small app, that could help you keep your
            progress everyday in front of your eyes's❞
          </h1>
        </div>
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
