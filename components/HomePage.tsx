import React from 'react';
import { whiteCoverCSSClasses } from '@/app/constants/constants';
import StartNowBox from './ui/StartNowBox';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <section
      className={`flex h-full w-full flex-1 flex-col gap-8 bg-cover bg-center bg-no-repeat py-4 md:p-4 ${whiteCoverCSSClasses}`}
      style={{ backgroundImage: 'url(/bg-2.jpg)' }}
    >
      <StartNowBox />
    </section>
  );
};

export default HomePage;
