'use client';
import { useAuth } from '@/contexts/authContext';
import { useEffect, useState } from 'react';

type Client = {
  _id: string;
  suspended: boolean;
};

type BalanceDay = {
  _id: string;
  client: string;
  dateTimeId: string;
  statistics: {
    chats: number;
    letters: number;
    dating: number;
    virtualGiftsSvadba: number;
    virtualGiftsDating: number;
  };
  translator: string;
  __v: number;
};

function useMongooseCalc() {
  const { mongooseUser } = useAuth();
  const [notSuspended, setNotSuspended] = useState<Client[]>([]);
  const [pickedClient, setPickedClient] = useState<Client>();
  const [clientBalance, setClientBalance] = useState<BalanceDay[]>([]);

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
    if (!pickedClient) {
      return;
    }
    const clientBalance = mongooseUser.balanceDays.filter(
      (day: BalanceDay) => day.client === pickedClient._id
    );
    console.log(clientBalance);
    setClientBalance(clientBalance);
  }, [pickedClient]);

  const handlePickedClientChange = (item) => {
    console.log('i trigger in mongoose');
    console.log(item);
    setPickedClient(item);
  };
  return {
    notSuspended,
    pickedClient,
    setPickedClient,
    handlePickedClientChange,
    clientBalance,
  };
}

export default useMongooseCalc;
