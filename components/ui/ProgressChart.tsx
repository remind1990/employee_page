import { BalanceDay } from '@/types/types';
import React from 'react';
import {
  calculateSum,
  getMonthNameFromId,
  calculateTotalSumForEachDayInMonth,
} from '../../helpers/chartsCalculationsHelpers';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';

type Props = {
  statistics: BalanceDay[];
  name: string | undefined;
};

export default function ProgressChart({ statistics, name }: Props) {
  const currentMonthName = moment().format('MMMM');

  // Get the number of days in the current month
  const daysInMonth = moment().daysInMonth();

  // Create an array of all the days in the month
  const allDaysInMonth = Array.from({ length: daysInMonth }, (_, i) =>
    moment()
      .date(i + 1)
      .format('DD')
  );

  // Merge existing statistics with all days in the month
  const month = allDaysInMonth.map((day) => {
    const foundDay = statistics.find(
      (d) => moment(d.dateTimeId).format('DD') === day
    );
    return {
      date: day,
      sum: foundDay ? calculateSum(foundDay.statistics).toFixed(2) : '0', // Set sum to 0 if no data exists for the day
    };
  });

  const calculatedMaxSum = Math.round(
    Math.max(...month.map((day) => parseFloat(day.sum))) * 1.2
  );

  const monthTotalSumForPickedClient =
    calculateTotalSumForEachDayInMonth(month);

  const maxSum = calculatedMaxSum === 0 ? 10 : calculatedMaxSum;

  return (
    <div className='flex w-full flex-col items-center justify-center pt-2 font-roboto md:w-full'>
      <h1>
        Your progress{' '}
        {name !== 'Substituted' ? `with ${name}` : 'during substitution'} for{' '}
        {currentMonthName} is:{' '}
        <span className='progress-number'>{monthTotalSumForPickedClient}</span>$
      </h1>
      <ResponsiveContainer width='100%' height={200}>
        <AreaChart
          data={month}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='4 3' />
          <XAxis dataKey='date' />
          <YAxis domain={[0, maxSum]} />
          <Tooltip />
          <Area type='monotone' dataKey='sum' stroke='#a4a2c3' fill='#da78d9' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
