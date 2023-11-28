import React from 'react';
import TableComponent from './Table';
import moment from 'moment';

const getBoldedStyle = (value: number) =>
  value > 0
    ? { fontWeight: 'bold', background: 'rgba(34, 197, 94, 1)', color: 'white' }
    : {};

type Props = {
  id: string;
  client: {
    chats: number;
    dating: number;
    letters: number;
    penalties: number;
    phoneCalls: number;
    photoAttachments: number;
    virtualGiftsDating: number;
    virtualGiftsSvadba: number;
  };
};

function TableRow({ id, client }: Props) {
  const clientPropsToShowInRows = [
    'chats',
    'dating',
    'letters',
    'penalties',
    'phoneCalls',
    'virtualGiftsDating',
    'virtualGiftsSvadba',
  ] as const;

  return (
    <TableComponent.Row>
      <div className={`pl-2 text-left font-bold`}>
        {moment(id, 'DD MM YYYY').format('DD,')}
        <span
          className={`pl-2 ${
            moment(id, 'DD MM YYYY').day() >= 5 ? 'text-red-400' : ''
          }`}
        >
          {moment(id, 'DD MM YYYY').format('ddd')}
        </span>
      </div>
      {clientPropsToShowInRows.map((prop) => (
        <div
          key={prop}
          className='text-stone-500'
          style={getBoldedStyle(client[prop])}
        >
          {client[prop]}
        </div>
      ))}
    </TableComponent.Row>
  );
}

export default TableRow;
