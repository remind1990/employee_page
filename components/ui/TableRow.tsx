import React from 'react';
import TableComponent from './Table';
import moment from 'moment';
import { NewStatistic } from '@/types/types';

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
  const clientPropsToShowInRows = [
    'chats',
    'dating',
    'letters',
    'phoneCalls',
    'virtualGiftsDating',
    'virtualGiftsSvadba',
    'voiceMessages',
  ] as const;

  return (
    <TableComponent.Row>
      <div className={`pl-2 text-left font-bold`}>
        {moment(date).format('D, MMMM')}
      </div>
      {clientPropsToShowInRows.map((prop) => (
        <div
          key={prop}
          className='text-stone-500'
          style={getBoldedStyle(statistics?.[prop] || 0)} // Use optional chaining
        >
          {statistics?.[prop] || 0} {/* Use optional chaining */}
        </div>
      ))}
    </TableComponent.Row>
  );
}

export default TableRow;
