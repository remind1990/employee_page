'use client';
import { useAuth } from '@/contexts/authContext';
import { convertDateToISOStringInUTC } from '@/helpers/dateCalcs/dateCalcs';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const getStartOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

const getEndOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0);
};

export const CustomDatePicker = () => {
  const { updateBalanceDays } = useAuth();
  const [startDate, setStartDate] = useState<Date>(getStartOfMonth());
  const [endDate, setEndDate] = useState<Date>(getEndOfMonth());

  const onChange = async (dates: (Date | null)[]) => {
    const [start, end] = dates;
    const datesToUTCArray = dates.map((date) => {
      return date ? convertDateToISOStringInUTC(date) : null;
    });
    if (start && end) {
      await updateBalanceDays(datesToUTCArray);
    }

    setStartDate(start!);
    setEndDate(end!);
  };
  const dayClassName = () => {
    return 'font-roboto font-bold';
  };

  return (
    <DatePicker
      showDisabledMonthNavigation
      selected={startDate}
      onChange={onChange}
      closeOnScroll={true}
      startDate={startDate}
      endDate={endDate}
      minDate={new Date('2024-04-01')}
      maxDate={new Date()}
      selectsRange
      className='min-w-[220px] rounded-md border border-stone-300 bg-stone-200 px-2 py-2 font-roboto font-bold focus:border-orange-500 focus:outline-none'
      calendarClassName='bg-stone-8'
      dayClassName={dayClassName}
    />
  );
};
