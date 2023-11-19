import React, { createContext, useContext } from 'react';

type TableContextProps = {
  columns: string;
};

const TableContext = createContext<TableContextProps | undefined>(undefined);

type StyledTableProps = {
  children: React.ReactNode;
};

const StyledTable: React.FC<StyledTableProps> = ({ children }) => (
  <div className='overflow-hidden rounded border border-gray-200 bg-gray-100 text-base'>
    {children}
  </div>
);

type CommonRowProps = {
  columns: string;
  children: React.ReactNode;
};

const CommonRow: React.FC<CommonRowProps> = ({ columns, children }) => (
  <div
    className={`grid grid-cols-${columns} items-center gap-6 transition-none`}
  >
    {children}
  </div>
);

type StyledHeaderProps = {
  columns: string;
  children: React.ReactNode;
};

const StyledHeader: React.FC<StyledHeaderProps> = ({ columns, children }) => (
  <CommonRow columns={columns}>{children}</CommonRow>
);

type StyledRowProps = {
  columns: string;
  children: React.ReactNode;
};

const StyledRow: React.FC<StyledRowProps> = ({ columns, children }) => (
  <CommonRow columns={columns}>{children}</CommonRow>
);

type StyledBodyProps = {
  children: React.ReactNode;
};

const StyledBody: React.FC<StyledBodyProps> = ({ children }) => (
  <section className='m-1/6'>{children}</section>
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
  <p className='m-6 text-center text-base font-semibold'>{children}</p>
);

type TableProps = {
  columns: string;
  children: React.ReactNode;
};

const Table: React.FC<TableProps> = ({ columns, children }) => (
  <TableContext.Provider value={{ columns }}>
    <StyledTable>{children}</StyledTable>
  </TableContext.Provider>
);

type HeaderProps = {
  children: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role='row' columns={columns} as='header'>
      {children}
    </StyledHeader>
  );
};

type RowProps = {
  children: React.ReactNode;
};

const Row: React.FC<RowProps> = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role='row' columns={columns}>
      {children}
    </StyledRow>
  );
};

type BodyProps = {
  data: any[];
  render: (item: any) => React.ReactNode;
};

const Body: React.FC<BodyProps> = ({ data, render }) => {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
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
