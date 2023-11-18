'use client';
import React from 'react';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/navigation';
import ClientCard from './ui/ClientCard';
import Error from 'next/error';

function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace('/login');
    return <Error statusCode={404} />;
  }
  const fakeClients = [1, 2, 3, 4, 5];
  return (
    <main className='py-10 pl-10'>
      <div className='flex min-h-[300px] w-full flex-wrap gap-2 rounded-tl-xl bg-slate-100 p-4 drop-shadow-xl'>
        {fakeClients.map((client) => (
          <ClientCard key={client} />
        ))}
      </div>
      <div className='min-h-[300px] w-full rounded-bl-xl bg-stone-700'></div>
    </main>
  );
}

export default Dashboard;
