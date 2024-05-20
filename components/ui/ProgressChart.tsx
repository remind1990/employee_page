import { ClientBalanceDay } from '@/types/types';
import React from 'react';
import {
  calculateSum,
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
import {
  ALL_DAYS_IN_MONTH,
  CURRENT_MONTH_NAME,
  DAYS_IN_CURRENT_MONTH,
} from '@/app/constants/constants';

type Props = {
  balanceDay: ClientBalanceDay[];
  name: string | undefined;
};

export default function ProgressChart({ balanceDay, name }: Props) {
  const month = ALL_DAYS_IN_MONTH.map((day) => {
    console.log(balanceDay);
    const foundDay = balanceDay.find(
      (d) => moment(d.dateTimeId).format('DD') === day
    );
    return {
      date: day,
      sum: foundDay ? calculateSum(foundDay?.statistics).toFixed(2) : '0',
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
        {name !== 'Substituted' ? `with ${name}` : 'during substitution'}{' '}
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
