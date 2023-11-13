import React from 'react';
import Header from './ui/Header';
import Sidebar from './ui/Sidebar';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div
      className='flex h-screen w-full flex-col  gap-8 bg-cover bg-center'
      style={{ backgroundImage: 'url(/bg-2.jpg)' }}
    >
      <Header />
      <Sidebar />
    </div>
  );
};

export default HomePage;
