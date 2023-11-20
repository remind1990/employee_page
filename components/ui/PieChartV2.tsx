import { calculateTotalSumForEachCategory } from '@/helpers/chartsCalsHelpers';
import { BalanceDay } from '@/types/types';
import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const fakeStatistics = [
  {
    id: '01 11 2023',
    clients: [
      {
        id: 'client1',
        chats: 5,
        letters: 10,
        dating: 3,
        VG: 3,
        VGD: 3,
        PC: 3,
        // Add more fields as needed
      },
      {
        id: 'client2',
        chats: 8,
        letters: 5,
        dating: 2,
        VG: 3,
        VGD: 3,
        PC: 3,
        // Add more fields as needed
      },
    ],
  },
  {
    id: '02 11 2023',
    clients: [
      {
        id: 'client1',
        chats: 3,
        letters: 12,
        dating: 6,
        VG: 3,
        VGD: 3,
        PC: 3,
        // Add more fields as needed
      },
      {
        id: 'client2',
        chats: 6,
        letters: 8,
        dating: 4,
        VG: 3,
        VGD: 3,
        PC: 3,
        // Add more fields as needed
      },
    ],
  },
  // Add more days as needed
];

type Props = {
  statistics: BalanceDay[];
};

function PieChartV2({ statistics }: Props) {
  const statsWithTotalSums = calculateTotalSumForEachCategory(fakeStatistics);
  return (
    <div className='max-h-[200px] w-full'>
      <h1>Progress per category:</h1>
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
            {statsWithTotalSums.map((entry, index) => (
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
            width='30%'
            layout='vertical'
            iconSize={15}
            iconType='circle'
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartV2;
