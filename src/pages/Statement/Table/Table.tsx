import { Transaction } from 'parser';
import style from './Table.module.scss';
import { useEffect, useState } from 'react';
import { RowMode } from '../../../types';
import { columns } from '../../../utils/constants';
import { cn, convertValue, propertyTypesMapping } from '../../../utils/utils';
import { useStatementContext } from '../../../context/StatementContext';

const DataColumn = ({ transaction }: { transaction: Transaction }) => (
  <td
    colSpan={7}
    onClick={() => navigator.clipboard.writeText(transaction.data)}
  >
    {transaction.data}
  </td>
);

const AllColumns = ({ transaction }: { transaction: Transaction }) => {
  return columns
    .filter((item) => item.isVisible)
    .map((column, i) => {
      const type = propertyTypesMapping[column.value];
      const value = transaction[column.value];
      const { copyValue, displayValue } = convertValue(value, type);
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

const TableRow = ({ transaction }: { transaction: Transaction }) => {
  const { updateTransaction, tableState } = useStatementContext();

  const [rowMode, setRowMode] = useState<RowMode>('allColumns');

  useEffect(() => {
    setRowMode('allColumns');
  }, [tableState]);

  const handleModeClick = () =>
    setRowMode((mode) => (mode === 'allColumns' ? 'dataColumn' : 'allColumns'));

  const handleChange = () => {
    const updatedTransaction: Transaction = {
      ...transaction,
      isClear: !transaction.isClear,
    };
    updateTransaction(transaction.id, updatedTransaction);
  };

  return (
    <tr>
      {mapping[rowMode]({ transaction })}
      <td onClick={handleModeClick}>Show</td>
      <td
        className={cn(
          style.checkbox,
          transaction.isClear && style.checkboxIsClear
        )}
        onClick={handleChange}
      />
    </tr>
  );
};

const TableBody = () => {
  const { transactions } = useStatementContext();

  return (
    <tbody>
      {transactions.map((transaction, i) => (
        <TableRow key={i} transaction={transaction} />
      ))}
    </tbody>
  );
};

export const Table = () => (
  <table className={style.table}>
    <TableHeader />
    <TableBody />
  </table>
);
