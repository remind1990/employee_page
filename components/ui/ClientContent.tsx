'use client';
import React, { useEffect, useState } from 'react';
import ProgressChart from './ProgressChart';
import TableComponent from './Table';
import TableRow from './TableRow';
import { BalanceDay, DayWithSums } from '@/types/types';
import PieChartV2 from './PieChartV2';
import Pagination from './PaginationComponents';
import moment from 'moment';
import {
  FaRocketchat,
  FaHeart,
  FaPhone,
  FaGift,
  FaMicrophone,
} from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { ColorEnum } from '@/app/enums/enums';
import { DAYS_TILL_TODAY } from '@/app/constants/constants';

type MonthTotalSums = {
  totalSum: number;
  daysWithTotalSum: DayWithSums[];
};
type Props = {
  client: Client | null;
  userName?: string;
  userSurname?: string;
  clientBalance: BalanceDay[];
};
type Client = {
  _id?: string;
  name: string;
  surname: string;
};

function ClientContent({ client, clientBalance }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage());
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, DAYS_TILL_TODAY.length);
  const paginatedStatistics = DAYS_TILL_TODAY.slice(startIndex, endIndex);
  const totalPages = Math.ceil(DAYS_TILL_TODAY.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    function handleResize() {
      setItemsPerPage(calculateItemsPerPage());
      const newCurrentPage = Math.ceil(startIndex / itemsPerPage) + 1;
      setCurrentPage(newCurrentPage);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [startIndex, itemsPerPage]);

  function calculateItemsPerPage() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 800) {
      return 7;
    } else if (screenWidth < 1200) {
      return 10;
    } else {
      return 15;
    }
  }

  // const totalPages = Math.ceil(statistics?.length / itemsPerPage);
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
        <TableComponent>
          <TableComponent.Header>
            <div>{moment().format('MMM / YYYY')}</div>
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
              <FaPhone fill={ColorEnum.SKY_BLUE} />
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
          <TableComponent.Body
            data={paginatedStatistics}
            render={(day) => {
              const dataForDay = clientBalance.find(
                (item) => moment(item.dateTimeId).date() === day.date()
              );
              return (
                <TableRow
                  date={day.format('YYYY-MM-DD')}
                  statistics={dataForDay ? dataForDay.statistics : {}}
                  key={day.format('YYYY-MM-DD')}
                />
              );
            }}
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
