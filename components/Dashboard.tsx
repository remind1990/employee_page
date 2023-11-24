'use client';
import React, { useEffect, useState } from 'react';
import { Statistic, Day, Client, BalanceDay } from '@/types/types';
import { whiteCoverCSSClasses } from '@/app/constants/constants';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/navigation';
import ClientCard from './ui/ClientCard';
import Error from 'next/error';
import ClientContent from './ui/ClientContent';

function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router?.replace('/login');
    return <Error statusCode={404} />;
  }

  const { clients, statistics, name, surname } = user;
  const notSuspendedClients = clients.filter(
    (client: { suspended?: boolean }) => client?.suspended === false
  );
  const [pickedClient, setPickedClient] = useState(notSuspendedClients[0]);

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

  return (
    <main
      className={`p-10 ${whiteCoverCSSClasses}`}
      style={{ backgroundImage: "url('/main-background.jpg')" }}
    >
      <div className='z-10 flex min-h-[150px] w-full flex-1 flex-wrap gap-2 rounded-t-xl bg-gradient-to-b from-slate-100 to-pink-300 p-4 drop-shadow-xl'>
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
        statistics={daysOnlyWithPickedClient}
        userName={name}
        userSurname={surname}
      />
    </main>
  );
}

export default Dashboard;
