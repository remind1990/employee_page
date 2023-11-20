import React from 'react';
import TableComponent from './Table';
import { Day } from '@/types/types';

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
  columns: string;
};

function TableRow({ id, client }: Props) {
  const {
    chats,
    dating,
    letters,
    penalties,
    phoneCalls,
    virtualGiftsDating,
    virtualGiftsSvadba,
  } = client;

  return (
    <TableComponent.Row>
      <div>{id}</div>
      <div>{chats}</div>
      <div>{letters}</div>
      <div>{dating}</div>
      <div>{virtualGiftsSvadba}</div>
      <div>{virtualGiftsDating}</div>
      <div>{phoneCalls}</div>
      <div>{penalties}</div>
    </TableComponent.Row>
  );
}

export default TableRow;
