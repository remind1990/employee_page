import Header from '@/components/ui/Header';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header variant='dark' />
      {children}
    </div>
  );
};

export default layout;
