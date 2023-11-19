import React from 'react';
import ProgressChart from './ProgressChart';
import TableComponent from './Table';
import TableRow from './TableRow';

type Props = {
  clients: [Client];
  statistics?: [];
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
    <div className='grid min-h-[300px] w-full grid-cols-[0.7fr,1fr] rounded-bl-xl bg-stone-700 text-stone-800'>
      <div className='col-span-1 text-stone-100'>
        <h1>Hello! {userName} Start exploring your dashboard</h1>
        <ProgressChart />
      </div>
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
          render={(day) => <TableRow day={day} />}
        />
      </TableComponent>
    </div>
  );
}

export default ClientContent;
