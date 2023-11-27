import { Client } from '@/types/types';
import Image from 'next/image';
import React from 'react';

type Props = {
  client: Client;
  selectClient: (client: Client) => void;
  pickedClientId?: string;
};

function ClientCard({ client, selectClient, pickedClientId }: Props) {
  const handleClick = () => {
    selectClient(client);
  };
  const clientIsSelected = client._id === pickedClientId;
  const styleForSelectedClient = clientIsSelected
    ? `scale-125 mx-4 shadow-levitateSelectedRed z-10`
    : ``;
  const hoverStyles = clientIsSelected
    ? ''
    : 'hover:mx-4 hover:scale-125 hover:shadow-levitate hover:z-10';
  return (
    <div
      className='flex cursor-pointer flex-col gap-1 rounded-md'
      onClick={handleClick}
    >
      <div
        className={`relative box-border rounded-md transition-all duration-300 ${hoverStyles} ${styleForSelectedClient}`}
      >
        <Image
          src={client.image ?? '/defaultClient.jpg'}
          alt='client'
          width={150}
          height={200}
          className='h-[200px] w-[150px] transform rounded-md object-cover object-top'
          blurDataURL='/defaultClient.jpg'
        />
        <div className='absolute bottom-[-10px] w-full px-2'>
          <p className='line rounded-md bg-stone-200 px-3 py-1 text-center text-sm font-bold leading-5 text-stone-700'>
            {client?.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientCard;
