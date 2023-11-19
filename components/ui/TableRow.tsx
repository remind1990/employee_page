import React from 'react';
import TableComponent from './Table';
import { Day } from '@/types/types';

type Props = {
  day: Day;
};

function TableRow({ day }: Props) {
  const { id, clients } = day;
  const {
    chats,
    dating,
    letters,
    penalties,
    phoneCalls,
    photoAttachments,
    virtualGiftsDating,
    virtualGiftsSvadba,
  } = clients[0];
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
