'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/navigation';
import ClientCard from './ui/ClientCard';
import Error from 'next/error';
import ClientContent from './ui/ClientContent';
import { Statistic, Day, Client, BalanceDay } from '@/types/types';

function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace('/login');
    return <Error statusCode={404} />;
  }

  const { clients, statistics, name, surname } = user;
  const notSuspendedClients = clients.filter(
    (client: { suspended?: boolean }) => client?.suspended === false
  );
  const [pickedClient, setPickedClient] = useState(notSuspendedClients[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust as needed

  useEffect(() => {
    if (notSuspendedClients && notSuspendedClients.length > 0) {
      if (!pickedClient || pickedClient.suspended) {
        setPickedClient(notSuspendedClients[0]);
      }
    }
  }, [notSuspendedClients, pickedClient]);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const todayString = `${currentDay} ${currentMonth} ${currentYear}`;

  const curYearStatistic: Statistic[] = statistics.filter(
    (item: Statistic) => item.year === currentYear.toString()
  );
  const thisMonthsStatistics: Day[] = curYearStatistic[0].months[
    currentMonth
  ].filter((day: Day) => {
    return day.id <= todayString;
  });
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const daysOnlyWithPickedClient: BalanceDay[] = thisMonthsStatistics.map(
    (day: Day) => {
      const filteredClients = day.clients.filter(
        (client: any) => client.id === pickedClient._id
      );
      return {
        ...day,
        clients: filteredClients,
      };
    }
  );
  const paginatedStatistics = daysOnlyWithPickedClient.slice(
    startIndex,
    endIndex
  );
  const totalPages = Math.ceil(thisMonthsStatistics.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className='z-10 py-10 pl-10'>
      <div className=' flex min-h-[150px] w-full flex-wrap gap-2 rounded-tl-xl bg-gradient-to-b from-slate-100 to-pink-300 p-4 drop-shadow-xl'>
        {notSuspendedClients.map((client: Client) => (
          <ClientCard
            key={client?._id}
            client={client}
            selectClient={setPickedClient}
          />
        ))}
      </div>
      <ClientContent
        client={pickedClient}
        dataPerPage={paginatedStatistics}
        statistics={daysOnlyWithPickedClient}
        userName={name}
        userSurname={surname}
      />
      <div className='mt-2 flex justify-center'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-2 px-4 py-2 ${
              currentPage === index + 1
                ? 'bg-orange-500 text-white'
                : 'bg-gray-300'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </main>
  );
}

export default Dashboard;
