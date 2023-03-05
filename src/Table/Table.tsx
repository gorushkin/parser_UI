import { Transaction } from '../parser';
import { TableMode } from '../types';
import { columns } from '../constants';
import style from './Table.module.scss';

const TableHeader = () => (
  <thead>
    <tr>
      {columns.map(({ label }) => (
        <th key={label}>{label}</th>
      ))}
    </tr>
  </thead>
);

const TableBody = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <tbody>
      {transactions.map((transaction, index) => {
        return (
          <tr key={index}>
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
      })}
    </tbody>
  );
};

export const Table = ({ transactions, mode }: { transactions: Transaction[]; mode: TableMode }) => {
  return (
    <table className={style.table}>
      <TableHeader />
      <TableBody transactions={transactions}/>
    </table>
  );
};
