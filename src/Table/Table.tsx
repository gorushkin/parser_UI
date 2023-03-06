import { Transaction } from 'parser';
import { columns } from '../constants';
import style from './Table.module.scss';
import { useEffect, useState } from 'react';
import { convertValue, propertyTypesMapping } from '../utils';
import { RowMode } from '../types';

const DataColumn = ({ transaction }: { transaction: Transaction }) => (
  <td colSpan={7} onClick={() => navigator.clipboard.writeText(transaction.data)}>
    {transaction.data}
  </td>
);

const AllColumns = ({ transaction }: { transaction: Transaction }) => {
  return columns
    .filter((item) => item.isVisible)
    .map((column, i) => {
      const type = propertyTypesMapping[column.value];
      const { copyValue, displayValue } = convertValue(transaction[column.value], type);
      return (
        <td onClick={() => navigator.clipboard.writeText(copyValue)} key={i}>
          {displayValue}
        </td>
      );
    });
};

const mapping: Record<
  RowMode,
  ({ transaction }: { transaction: Transaction }) => JSX.Element[] | JSX.Element
> = {
  allColumns: AllColumns,
  dataColumn: DataColumn,
};

const TableHeader = () => (
  <thead>
    <tr>
      {columns.map(({ label }) => (
        <th key={label}>{label}</th>
      ))}
    </tr>
  </thead>
);

const TableRow = ({
  transaction,
  tableState,
}: {
  transaction: Transaction;
  tableState: boolean;
}) => {
  const [rowMode, setRowMode] = useState<RowMode>('allColumns');

  useEffect(() => {
    setRowMode('allColumns');
  }, [tableState]);

  const handleModeClick = () => {
    setRowMode((mode) => (mode === 'allColumns' ? 'dataColumn' : 'allColumns'));
  };

  return (
    <tr>
      {mapping[rowMode]({ transaction })}
      <td onClick={handleModeClick}>Show</td>
    </tr>
  );
};

const TableBody = ({
  transactions,
  tableState,
}: {
  tableState: boolean;
  transactions: Transaction[];
}) => (
  <tbody>
    {transactions.map((transaction, i) => (
      <TableRow tableState={tableState} key={i} transaction={transaction} />
    ))}
  </tbody>
);

export const Table = ({
  transactions,
  tableState,
}: {
  tableState: boolean;
  transactions: Transaction[];
}) => (
  <table className={style.table}>
    <TableHeader />
    <TableBody tableState={tableState} transactions={transactions} />
  </table>
);
