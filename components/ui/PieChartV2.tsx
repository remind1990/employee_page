import { YESTERDAY } from '@/app/constants/constants';
import {
  calculateSum,
  calculateTotalSumForEachCategory,
  convertVariableToTitle,
} from '@/helpers/chartsCalculationsHelpers';
import { ClientBalanceDay } from '@/types/types';
import moment from 'moment';
import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

type Props = {
  balanceDay: ClientBalanceDay[];
};

function PieChartV2({ balanceDay }: Props) {
  const statsWithTotalSums = calculateTotalSumForEachCategory(balanceDay);
  const yesterdayBalanceDay = balanceDay.find((day) =>
    moment.utc(day.dateTimeId).isSame(YESTERDAY, 'day')
  );
  const yesterdayProgress = yesterdayBalanceDay
    ? calculateSum(yesterdayBalanceDay?.statistics).toFixed(2)
    : '0';

  return (
    <>
      {yesterdayBalanceDay && (
        <h1>
          Yesterday Progress:{' '}
          <span className='progress-number'>{yesterdayProgress}</span>$
        </h1>
      )}
      <ResponsiveContainer width='100%' height={450} className={'mt-[-100px]'}>
        <PieChart>
          <Pie
            data={statsWithTotalSums}
            nameKey={'name'}
            dataKey={'value'}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
          >
            {statsWithTotalSums?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                stroke={entry.color}
                fill={entry.color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            formatter={(value, entry) =>
              entry.payload && 'name' in entry.payload
                ? // @ts-ignore
                  convertVariableToTitle(entry.payload.name)
                : ''
            }
            verticalAlign='middle'
            align='left'
            // @ts-ignore
            width='35%'
            iconSize={15}
            iconType='circle'
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default PieChartV2;
