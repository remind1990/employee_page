import { yesterdayString } from '@/app/constants/constants';
import { calculateTotalSumForEachCategory } from '@/helpers/chartsCalculationsHelpers';
import { BalanceDay, DayWithSums } from '@/types/types';
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
  statistics: BalanceDay[];
  totalSum: number;
  daysWithTotalSum: DayWithSums[];
};

function PieChartV2({ statistics, totalSum, daysWithTotalSum }: Props) {
  const statsWithTotalSums =
    statistics && calculateTotalSumForEachCategory(statistics);
  const progressForYesterday = daysWithTotalSum.find(
    (day) => day.id === yesterdayString
  );

  return (
    <div className='h-[350px] max-h-[400px] w-full overflow-y-scroll sm:h-[250px] sm:max-h-[400px]'>
      <h1>
        Yesterday Progress:{' '}
        <span className='progress-number'>
          {progressForYesterday?.allClientsSum}
        </span>
        $
        <br />
        Total progress: <span className='progress-number'>{totalSum}</span>$
      </h1>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={statsWithTotalSums}
            nameKey='name'
            dataKey={'value'}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
            cx='50%'
            cy='40%'
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
            verticalAlign='middle'
            align='left'
            // @ts-ignore
            width='35%'
            iconSize={15}
            iconType='circle'
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartV2;
