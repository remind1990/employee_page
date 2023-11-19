import Image from 'next/image';
import React from 'react';
import { HiChatBubbleOvalLeft } from 'react-icons/hi2';

type Props = {
  client: Client;
};
type Client = {
  _id?: string;
  name: string;
  surname: string;
};
function ClientCard({ client }: Props) {
  return (
    <div className='relative flex flex-col gap-1 rounded-md'>
      <Image
        src='/defaultClient.jpg'
        alt='client'
        width={200}
        height={150}
        className='rounded-md'
      />

      <div className='absolute top-[120px] px-4'>
        <h1 className='text-md rounded-md bg-stone-200 px-3 text-stone-700 '>
          {client?.name} {client?.surname}
        </h1>
      </div>
    </div>
  );
}

export default ClientCard;
