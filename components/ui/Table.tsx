import { BalanceDay } from '@/types/types';
import React, { createContext, useContext } from 'react';

type StyledTableProps = {
  children: React.ReactNode;
};

const StyledTable: React.FC<StyledTableProps> = ({ children }) => (
  <div className=' h-auto min-h-[200px] overflow-y-auto bg-stone-100 text-base'>
    {children}
  </div>
);

type CommonRowProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const CommonRow: React.FC<CommonRowProps> = ({
  children,
  style = undefined,
}) => (
  <div
    style={style}
    className={`grid grid-cols-8 items-center gap-6 border border-stone-400 p-2 text-center font-sans text-sm transition-none md:gap-2`}
  >
    {children}
  </div>
);

type StyledHeaderProps = {
  children: React.ReactNode;
};

const StyledHeader: React.FC<StyledHeaderProps> = ({ children }) => (
  <CommonRow style={{ fontWeight: 'bold', fontSize: 16 }}>{children}</CommonRow>
);

type StyledRowProps = {
  children: React.ReactNode;
};

const StyledRow: React.FC<StyledRowProps> = ({ children }) => (
  <CommonRow>{children}</CommonRow>
);

type StyledBodyProps = {
  children: React.ReactNode;
};

const StyledBody: React.FC<StyledBodyProps> = ({ children }) => (
  <section className='1/6'>{children}</section>
);

type FooterProps = {
  children: React.ReactNode;
};

const Footer: React.FC<FooterProps> = ({ children }) => (
  <footer className='flex justify-center bg-gray-200 p-3'>{children}</footer>
);

type EmptyProps = {
  children: React.ReactNode;
};

const Empty: React.FC<EmptyProps> = ({ children }) => (
  <p className='m-6 text-center font-roboto text-base'>{children}</p>
);

type TableProps = {
  children: React.ReactNode;
};

const Table: React.FC<TableProps> = ({ children }) => (
  <StyledTable>{children}</StyledTable>
);

type HeaderProps = {
  children: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>;
};

type RowProps = {
  children: React.ReactNode;
};

const Row: React.FC<RowProps> = ({ children }) => {
  return <StyledRow>{children}</StyledRow>;
};

type BodyProps = {
  data?: BalanceDay[];
  render: (item: any) => React.ReactNode;
};

const Body: React.FC<BodyProps> = ({ data, render }) => {
  if (!data?.length) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data?.map(render)}</StyledBody>;
};

type TableComponent = React.FC<TableProps> & {
  Header: React.FC<HeaderProps>;
  Row: React.FC<RowProps>;
  Body: React.FC<BodyProps>;
  Footer: React.FC<FooterProps>;
};

const TableComponent: TableComponent = Object.assign(Table, {
  Header,
  Row,
  Body,
  Footer,
});

export default TableComponent;
