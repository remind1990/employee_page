'use client';
import React from 'react';
import ProgressChart from './ProgressChart';
import TableComponent from './Table';
import TableRow from './TableRow';
import { ClientBalanceDay, TotalSums } from '@/types/types';
import PieChartV2 from './PieChartV2';
import moment from 'moment';
import { FaRocketchat, FaHeart, FaGift, FaMicrophone } from 'react-icons/fa';
import { FaPhotoFilm } from 'react-icons/fa6';
import { IoMail } from 'react-icons/io5';
import { ColorEnum } from '@/app/enums/enums';
import { CustomDatePicker } from './CustomDatePicker';
import { ORDER_KEYS } from '@/app/constants/constants';

type Props = {
  client: Client | null;
  userName?: string;
  userSurname?: string;
  clientBalance: ClientBalanceDay[];
  sums: TotalSums | null;
};
type Client = {
  _id?: string;
  name: string;
  surname: string;
};

function ClientContent({ client, clientBalance, sums }: Props) {
  return (
    <section className='relative z-10 flex h-full w-full flex-col-reverse bg-stone-700 text-stone-800 lg:grid lg:grid-cols-[0.7fr,1fr]'>
      <div className='col-span-1 flex flex-col gap-5 px-2 py-4 text-stone-100'>
        {clientBalance.length > 0 && (
          <>
            <ProgressChart name={client?.name} balanceDay={clientBalance} />

            <PieChartV2 balanceDay={clientBalance} />
          </>
        )}
      </div>
      <div className='col-span-1 h-full w-full'>
        <div className='flex items-center space-x-10'>
          <CustomDatePicker />
          <p className='font-roboto text-xl text-stone-300'>
            Total: <b>{sums?.totalSum}$</b>
          </p>
        </div>

        <TableComponent>
          <TableComponent.Header>
            <div>
              {moment.utc(clientBalance[0]?.dateTimeId).format('MMM / YYYY')}
            </div>
            <div className='category-icon'>
              <FaRocketchat fill={ColorEnum.BLUE} />
            </div>
            <div className='category-icon'>
              <FaHeart fill={ColorEnum.RED} />
            </div>
            <div className='category-icon'>
              <IoMail fill={ColorEnum.ORANGE} />
            </div>
            <div className='category-icon'>
              <FaPhotoFilm fill={ColorEnum.SKY_BLUE} />
            </div>
            <div className='category-icon'>
              <FaGift fill={ColorEnum.INDIGO} />
            </div>
            <div className='category-icon fill-pink-500'>
              <FaGift fill={ColorEnum.CRIMSON} />
            </div>
            <div className='category-icon'>
              <FaMicrophone fill={ColorEnum.PURPLE} />
            </div>
          </TableComponent.Header>
          {sums?.totalSumPerCategory && (
            <TableComponent.Header>
              <div className='pl-2 text-left  font-bold'>
                <p>all clients:</p>
              </div>
              {ORDER_KEYS.map((key, index) => {
                return (
                  <div
                    key={index}
                    className='pl-2 text-center text-lg font-bold'
                  >
                    {sums?.totalSumPerCategory[key]}
                  </div>
                );
              })}
            </TableComponent.Header>
          )}
          <TableComponent.Body
            data={clientBalance}
            render={(day, index) => {
              return (
                <TableRow
                  date={day.dateTimeId}
                  statistics={day.statistics}
                  key={index}
                />
              );
            }}
          />
        </TableComponent>
      </div>
    </section>
  );
}

export default ClientContent;
