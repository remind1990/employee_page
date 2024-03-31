import React from 'react';

type Props = {};

function ImagineConverter({}: Props) {
  return (
    <main
      className={`min-w-screen   relative z-10 min-h-screen`}
      style={{ backgroundImage: 'url(/main-background.jpg)' }}
    >
      <iframe
        src='https://image-converter-delta.vercel.app/'
        title='Image Converter'
        className='h-screen w-screen'
        style={{ border: 'none' }}
      />
    </main>
  );
}

export default ImagineConverter;
