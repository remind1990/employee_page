import React from 'react';
import TableComponent from './Table';
import moment from 'moment';

const getBoldedStyle = (value: number) =>
  value > 0
    ? {
        fontWeight: 'bold',
        background: 'var(--sunrise-progress-green)',
        color: 'white',
      }
    : {};

type Props = {
  id: string;
  statistics: {
    chats: number;
    dating: number;
    letters: number;
    penalties: number;
    phoneCalls: number;
    photoAttachments: number;
    virtualGiftsDating: number;
    virtualGiftsSvadba: number;
    voiceMessages: number;
  };
};

function TableRow({ id, statistics }: Props) {
  const clientPropsToShowInRows = [
    'chats',
    'dating',
    'letters',
    'phoneCalls',
    'virtualGiftsDating',
    'virtualGiftsSvadba',
    'voiceMessages',
  ] as const;

  const mediaQuery = window.matchMedia('(max-width: 640px)');
  const isMobile = mediaQuery.matches;
  return (
    <TableComponent.Row>
      <div className={`pl-2 text-left font-bold`}>
        {moment(id).format('D, MMMM')}
        {/* {!isMobile && (
          <span
            className={`pl-2 ${
              moment(id, 'DD MM YYYY').day() >= 5 ? 'text-red-400' : ''
            }`}
          >
            {moment(id, 'DD MM YYYY').format('ddd')}
          </span>
        )} */}
      </div>
      {clientPropsToShowInRows.map((prop) => (
        <div
          key={prop}
          className='text-stone-500'
          style={getBoldedStyle(statistics[prop])}
        >
          {statistics[prop] ?? 0}
        </div>
      ))}
    </TableComponent.Row>
  );
}

export default TableRow;
