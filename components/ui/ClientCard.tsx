import { Client } from '@/types/types';
import Image from 'next/image';
import React from 'react';

type Props = {
  client: Client;
  selectClient: (client?: Client) => void;
};
const mediaQuery = window.matchMedia('(max-width: 640px)');
function ClientCard({ client, selectClient }: Props) {
  const handleClick = () => {
    selectClient(client);
  };
  return (
    <div
      className='relative flex cursor-pointer flex-col gap-1 rounded-md'
      onClick={handleClick}
    >
      <div className='box-border overflow-hidden rounded-md'>
        <Image
          src={client.image ?? '/defaultClient.jpg'}
          alt='client'
          width={150}
          height={200}
          className='h-[200px] w-[150px] transform object-cover object-top transition-all duration-300 hover:scale-125'
          blurDataURL='/defaultClient.jpg'
        />
      </div>

      <div className='absolute bottom-[-10px] px-4'>
        <h1 className='text-md rounded-md bg-stone-200 px-3 text-stone-700 '>
          {client?.name} {client?.surname}
        </h1>
      </div>
    </div>
  );
}

export default ClientCard;
