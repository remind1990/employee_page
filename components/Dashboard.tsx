'use client';
import React, { useEffect, useState } from 'react';
import { Statistic, Day, Client, BalanceDay } from '@/types/types';
import {
  whiteCoverCSSClasses,
  currentMonth,
  currentYear,
  todayString,
} from '@/app/constants/constants';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/navigation';
import ClientCard from './ui/ClientCard';
import ClientContent from './ui/ClientContent';
import { calcTotalSumForEveryClient } from '../helpers/chartsCalculationsHelpers';

function Dashboard() {
  const [pickedClient, setPickedClient] = useState<Client | null>(null);
  const { isAuthenticated, user } = useAuth();
  const { clients = [], statistics = [], name = '', surname = '' } = user ?? {};
  const router = useRouter();

  useEffect(() => {
    if (!user || !isAuthenticated) {
      router.replace('/login');
    }
  }, [user, router]);

  const notSuspendedClients = clients.filter(
    (client: { suspended?: boolean }) => !client?.suspended
  );

  useEffect(() => {
    if (notSuspendedClients && notSuspendedClients.length > 0) {
      if (!pickedClient || pickedClient.suspended) {
        setPickedClient(notSuspendedClients[0]);
      }
    }
  }, [notSuspendedClients, pickedClient]);

  const curYearStatistic: Statistic[] = statistics?.filter(
    (item: Statistic) => item.year === currentYear.toString()
  );
  const thisMonthsStatistics: Day[] =
    user &&
    curYearStatistic[0].months[currentMonth].filter((day: Day) => {
      return day.id <= todayString;
    });

  const monthTotalSumForEveryClient =
    calcTotalSumForEveryClient(thisMonthsStatistics);

  const daysOnlyWithPickedClient: BalanceDay[] = thisMonthsStatistics?.map(
    (day: Day) => {
      const filteredClients = day.clients
        .filter((client: any) => client.id === pickedClient?._id)
        .map((client: any) => {
          const filteredClient: any = {};
          for (const key in client) {
            if (
              typeof client[key] === 'number' &&
              key !== 'penalties' &&
              key !== 'photoAttachments'
            ) {
              filteredClient[key] = client[key];
            }
          }
          return filteredClient;
        });

      return {
        ...day,
        clients: filteredClients,
      };
    }
  );
  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  return (
    <main
      className={`z-10 py-10 pl-0 sm:pl-10 ${whiteCoverCSSClasses} relative`}
      style={{ backgroundImage: 'url(/main-background.jpg)' }}
    >
      <div
        className='sm:gap-z-4
      flex  w-full
      flex-wrap justify-center
      gap-x-10 gap-y-16 overflow-auto
      rounded-tl-xl
      bg-gradient-to-b from-slate-100 to-pink-300 px-4 pb-12 pt-10
      drop-shadow-xl
      sm:max-w-[100vw]
      sm:flex-wrap
      '
      >
        {notSuspendedClients.map((client: Client) => (
          <ClientCard
            key={client?._id}
            client={client}
            selectClient={setPickedClient}
            pickedClientId={pickedClient?._id}
          />
        ))}
      </div>
      {pickedClient && (
        <ClientContent
          monthTotalSumForEveryClient={monthTotalSumForEveryClient}
          client={pickedClient}
          statistics={daysOnlyWithPickedClient}
          userName={name}
          userSurname={surname}
        />
      )}
    </main>
  );
}

export default Dashboard;
