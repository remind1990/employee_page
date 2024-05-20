import React from 'react';
import TableComponent from './Table';
import moment from 'moment';
import { NewStatistic } from '@/types/types';
import { ORDER_KEYS } from '@/app/constants/constants';

const getBoldedStyle = (value: number) =>
  value > 0
    ? {
        fontWeight: 'bold',
        background: 'var(--sunrise-progress-green)',
        color: 'white',
      }
    : {};

type Props = {
  date: string;
  statistics: NewStatistic | undefined; // Change to undefined
};

function TableRow({ date, statistics }: Props) {
  return (
    <TableComponent.Row>
      <div className={`pl-2 text-left font-bold`}>
        {moment.utc(date).format('D, MMMM')}
      </div>
      {ORDER_KEYS.map((key) => (
        <div
          key={key}
          className='text-stone-500'
          style={getBoldedStyle(statistics?.[key] || 0)} // Use optional chaining
        >
          {statistics?.[key] || 0} {/* Use optional chaining */}
        </div>
      ))}
    </TableComponent.Row>
  );
}

export default TableRow;
