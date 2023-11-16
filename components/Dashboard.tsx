import React from 'react';
import ClientCard from './ui/ClientCard';

function Dashboard() {
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
