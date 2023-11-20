import React from 'react';
import ProgressChart from './ProgressChart';
import TableComponent from './Table';
import TableRow from './TableRow';
import { BalanceDay } from '@/types/types';
import PieChartComponent from './PieChartComponent';

type Props = {
  clients: [Client];
  statistics: BalanceDay[];
  userName?: string;
  userSurname?: string;
};
type Client = {
  _id?: string;
  name: string;
  surname: string;
};

function ClientContent({ clients, statistics, userName }: Props) {
  return (
    <section className='grid min-h-[300px] w-full grid-cols-[0.7fr,1fr] rounded-bl-xl bg-stone-700  text-stone-800'>
      <div className='col-span-1 min-h-[200px] px-2 py-5 text-stone-100'>
        <ProgressChart statistics={statistics} />
        <div className='flex w-full  items-center justify-around gap-4'>
          <h1 className='flex-shrink-0'>Progress per category:</h1>
          <div className='w-4/5'>
            <PieChartComponent statistics={statistics} />
          </div>
        </div>
      </div>
      <div className='col-span-1'>
        <TableComponent columns='8'>
          <TableComponent.Header>
            <div>{clients[0]?.name}</div>
            <div>Chats</div>
            <div>Letters</div>
            <div>Dating</div>
            <div>Virtual Gifts</div>
            <div>VG Dating</div>
            <div>Phone Calls</div>
            <div>Penalties</div>
          </TableComponent.Header>
          <TableComponent.Body
            data={statistics}
            render={(day) => (
              <TableRow
                columns='8'
                id={day.id}
                client={day.clients[0]}
                key={day.id}
              />
            )}
          />
        </TableComponent>
      </div>
    </section>
  );
}

export default ClientContent;
