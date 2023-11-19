'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/navigation';
import ClientCard from './ui/ClientCard';
import Error from 'next/error';
import ClientContent from './ui/ClientContent';

function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const [pickedClient, setPickedClient] = useState('');
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace('/login');
    return <Error statusCode={404} />;
  }

  const { clients, statistics, name, surname } = user;
  const notSuspendedClients = clients.filter(
    (client: { suspended?: boolean }) => client?.suspended === false
  );
  useEffect(() => {
    if (notSuspendedClients) {
      setPickedClient(notSuspendedClients[0]._id);
    }
  }, [notSuspendedClients]);
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const todayString = `${currentDay} ${currentMonth} ${currentYear}`;

  const curYearStatistic = statistics.filter(
    (item: { year: string; months: [] }) => item.year === currentYear.toString()
  );
  const thisMonthsStatistics = curYearStatistic[0].months[currentMonth];

  const daysOnlyWithPickedClient = thisMonthsStatistics
    .filter((day) => {
      return day.id <= todayString;
    })
    .map((day) => {
      const filteredClients = day.clients.filter(
        (client) => client.id === pickedClient
      );
      return {
        ...day,
        clients: filteredClients,
      };
    });

  console.log(daysOnlyWithPickedClient);
  return (
    <main className='py-10 pl-10'>
      <div className='flex min-h-[150px] w-full flex-wrap gap-2 rounded-tl-xl bg-gradient-to-b from-slate-100 to-pink-300 p-4 drop-shadow-xl'>
        {notSuspendedClients.map((client: { _id?: string }) => (
          <ClientCard key={client?._id} client={client} />
        ))}
      </div>
      <ClientContent
        clients={notSuspendedClients}
        statistics={daysOnlyWithPickedClient}
        userName={name}
        userSurname={surname}
      />
    </main>
  );
}

export default Dashboard;
