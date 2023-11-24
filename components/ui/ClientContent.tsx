'use client';
import React, { useState } from 'react';
import ProgressChart from './ProgressChart';
import TableComponent from './Table';
import TableRow from './TableRow';
import { BalanceDay } from '@/types/types';
import PieChartV2 from './PieChartV2';
import Pagination from './PaginationComponents';

type Props = {
  client: Client;
  statistics: BalanceDay[];
  userName?: string;
  userSurname?: string;
};
type Client = {
  _id?: string;
  name: string;
  surname: string;
};

function ClientContent({ client, statistics }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust as needed
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStatistics = statistics.slice(startIndex, endIndex);
  const totalPages = Math.ceil(statistics.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className='w-100 relative z-10 grid min-h-[300px] grid-cols-[0.7fr,1fr] rounded-b-xl bg-stone-700 p-10 text-stone-800'>
      <div className='col-span-1 flex min-h-[200px] flex-col gap-5 text-stone-100'>
        <ProgressChart statistics={statistics} />
        <PieChartV2 statistics={statistics} />
      </div>
      <div className='flex-column col-span-1 h-full flex-grow'>
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
            data={paginatedStatistics}
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
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}

export default ClientContent;
