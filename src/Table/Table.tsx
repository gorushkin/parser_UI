import { Transaction } from '../parser';
import { TransactionGroup, TableMode } from '../types';
import { columns } from '../constants';
import style from './Table.module.scss';
import { Fragment } from 'react';

const TableHeader = () => (
  <thead>
    <tr>
      {columns.map(({ label }) => (
        <th key={label}>{label}</th>
      ))}
    </tr>
  </thead>
);

const TableRow = ({ transaction }: { transaction: Transaction }) => (
  <tr>
    {columns.map((column, valueIndex) => {
      const value = transaction[column.value];
      return (
        <td onClick={() => navigator.clipboard.writeText(value.copyValue)} key={valueIndex}>
          {value.displayValue}
        </td>
      );
    })}
  </tr>
);

const TableBody = ({ groups }: { groups: TransactionGroup }) => (
  <tbody>
    {Object.entries(groups).map(([date, transactions], groupIndex) => (
      <Fragment key={groupIndex}>
        <tr>
          <td colSpan={7}>{date}</td>
        </tr>
        {transactions.map((transaction, transactionIndex) => (
          <TableRow key={transactionIndex} transaction={transaction} />
        ))}
      </Fragment>
    ))}
  </tbody>
);

export const Table = ({ transactions, mode }: { transactions: TransactionGroup; mode: TableMode }) => (
  <table className={style.table}>
    <TableHeader />
    <TableBody groups={transactions} />
  </table>
);
