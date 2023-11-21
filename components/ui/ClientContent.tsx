import React from 'react';
import ProgressChart from './ProgressChart';
import TableComponent from './Table';
import TableRow from './TableRow';
import { BalanceDay } from '@/types/types';
import PieChartV2 from './PieChartV2';

type Props = {
  client: Client;
  statistics: BalanceDay[];
  userName?: string;
  userSurname?: string;
  dataPerPage: BalanceDay[];
};
type Client = {
  _id?: string;
  name: string;
  surname: string;
};

function ClientContent({ client, statistics, dataPerPage }: Props) {
  return (
    <section className='grid min-h-[300px] w-full grid-cols-[0.7fr,1fr] rounded-bl-xl bg-stone-700  text-stone-800'>
      <div className='col-span-1 flex min-h-[200px] flex-col gap-5 px-2 py-5 text-stone-100'>
        <ProgressChart statistics={statistics} />
        <PieChartV2 statistics={statistics} />
      </div>
      <div className='col-span-1 h-full max-h-[500px] overflow-y-auto'>
        <TableComponent columns='8'>
          <TableComponent.Header>
            <div>{client.name}</div>
            <div>Chats</div>
            <div>Letters</div>
            <div>Dating</div>
            <div>Virtual Gifts</div>
            <div>VG Dating</div>
            <div>Phone Calls</div>
            <div>Penalties</div>
          </TableComponent.Header>
          <TableComponent.Body
            data={dataPerPage}
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
