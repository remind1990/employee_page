'use client';
import React, { useEffect, useState } from 'react';
import { Client, ClientBalanceDay, Day, TotalSums } from '@/types/types';
import { whiteCoverCSSClasses } from '@/app/constants/constants';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/navigation';
import ClientCard from './ui/ClientCard';
import ClientContent from './ui/ClientContent';
import { totalSumForSelectedDate } from '@/helpers/chartsCalculationsHelpers';

function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const { mongooseUser } = useAuth();
  const [notSuspended, setNotSuspended] = useState<Client[]>([]);
  const [pickedClient, setPickedClient] = useState<Client | null>(null);
  const [clientBalance, setClientBalance] = useState<ClientBalanceDay[]>([]);
  const [totalSumsForSelectedMonth, setTotalSumsForSelectedMonth] =
    useState<TotalSums | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user || !isAuthenticated) {
      router.replace('/login');
    }
  }, [user, router]);

  useEffect(() => {
    if (!mongooseUser || mongooseUser?.translator?.clients?.length === 0) {
      return;
    }

    const notSuspended = mongooseUser?.translator?.clients.filter(
      (client: Client) => !client.suspended
    );
    const defaultClient = notSuspended[0];

    setNotSuspended(notSuspended);
    setPickedClient(defaultClient);
  }, [mongooseUser]);

  useEffect(() => {
    if (!pickedClient || !mongooseUser.balanceDays) {
      setClientBalance([]);
      return;
    }
    const totalSum = totalSumForSelectedDate(
      mongooseUser.balanceDays.map((day: any) => day.statistics)
    );
    const balanceDays = mongooseUser.balanceDays.filter(
      (day: ClientBalanceDay) => day.client === pickedClient._id
    );
    setClientBalance(balanceDays);
    setTotalSumsForSelectedMonth(totalSum);
  }, [pickedClient, mongooseUser]);

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
        {notSuspended.length > 0 &&
          notSuspended.map((client: any) => {
            return (
              <ClientCard
                key={client?._id}
                client={client}
                setPickedClient={setPickedClient}
                pickedClientId={pickedClient?._id}
              />
            );
          })}
      </div>
      {pickedClient && mongooseUser && (
        <ClientContent
          client={pickedClient}
          clientBalance={clientBalance}
          sums={totalSumsForSelectedMonth}
        />
      )}
    </main>
  );
}

export default Dashboard;
