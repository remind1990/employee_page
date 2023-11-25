import Image from 'next/image';
import React from 'react';

type Props = {
  client: Client;
  selectClient: (client?: Client) => void;
};
type Client = {
  _id?: string;
  name: string;
  surname: string;
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
      <div className='box-border overflow-hidden'>
        <Image
          src='/defaultClient.jpg'
          alt='client'
          width={200}
          height={150}
          className='transform  rounded-md transition-all duration-300 hover:scale-125'
        />
      </div>

      <div className='absolute top-[120px] px-4'>
        <h1 className='text-md rounded-md bg-stone-200 px-3 text-stone-700 '>
          {client?.name} {client?.surname}
        </h1>
      </div>
    </div>
  );
}

export default ClientCard;
