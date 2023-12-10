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

type Props = {
  statistics: BalanceDay[];
  name: string | undefined;
};

export default function ProgressChart({ statistics, name }: Props) {
  const month =
    statistics &&
    statistics?.map((day) => {
      const newDay = {
        date: day.id.split(' ')[0],
        sum: calculateSum(day?.clients[0]).toFixed(2),
      };
      return newDay;
    });

  const calculatedMaxSum =
    statistics &&
    Math.round(Math.max(...month?.map((day) => parseFloat(day.sum))) * 1.2);

  const monthTotalSumForPickedClient =
    calculateTotalSumForEachDayInMonth(month);

  const maxSum = calculatedMaxSum === 0 ? 10 : calculatedMaxSum;
  const monthNumberAsString = statistics && statistics[0]?.id.split(' ')?.[1];
  const monthNumberAsNumber = parseInt(monthNumberAsString);
  const currentMonthName = getMonthNameFromId(monthNumberAsNumber);
  return (
    <div className='flex  w-full  flex-col items-center justify-center pt-2 font-roboto md:w-full'>
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
