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

type MonthTotalSums = {
  totalSum: number;
  daysWithTotalSum: DayWithSums[];
};
type Props = {
  client: Client | null;
  statistics: BalanceDay[];
  userName?: string;
  userSurname?: string;
  monthTotalSumForEveryClient: MonthTotalSums;
};
type Client = {
  _id?: string;
  name: string;
  surname: string;
};

function ClientContent({
  client,
  statistics,
  monthTotalSumForEveryClient: { totalSum, daysWithTotalSum },
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage());
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStatistics =
    statistics && statistics?.slice(startIndex, endIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    function handleResize() {
      setItemsPerPage(calculateItemsPerPage());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [statistics]);

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
  const totalPages = Math.ceil(statistics?.length / itemsPerPage);
  return (
    <section className='relative z-10 flex h-full w-full flex-col-reverse bg-stone-700 text-stone-800 lg:grid lg:grid-cols-[0.7fr,1fr]'>
      <div className='col-span-1 flex flex-col gap-5 px-2 py-4 text-stone-100'>
        <ProgressChart name={client?.name} statistics={statistics} />
        <PieChartV2
          statistics={statistics}
          totalSum={totalSum}
          daysWithTotalSum={daysWithTotalSum}
        />
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
            render={(day) => (
              <TableRow id={day.id} client={day.clients[0]} key={day.id} />
            )}
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
