import React from 'react';
import { TableMode } from '../PageTwo/PageTwo';
import { Row, Rows } from '../parser';
import style from './Table.module.scss';

const TableHeader = ({ headers }: { headers: Row }) => (
  <thead>
    <tr>
      {headers
        .filter((item) => item.isVisible)
        .map((item) => (
          <th key={item.key}>{item.displayValue}</th>
        ))}
    </tr>
  </thead>
);

const GroupedBody = ({ operations }: { operations: Rows }) => {
  return (
    <tbody>
      {operations.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row
            .filter((item) => item.isVisible)
            .map((item, itemIndex) => {
              return (
                <td onClick={() => navigator.clipboard.writeText(item.copyValue)} key={itemIndex}>
                  {item.displayValue}
                </td>
              );
            })}
        </tr>
      ))}
    </tbody>
  );
};

const WholeBody = ({ operations }: { operations: Rows }) => {
  return (
    <tbody>
      {operations.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row
            .filter((item) => item.isVisible)
            .map((item, itemIndex) => {
              return (
                <td onClick={() => navigator.clipboard.writeText(item.copyValue)} key={itemIndex}>
                  {item.displayValue}
                </td>
              );
            })}
        </tr>
      ))}
    </tbody>
  );
};

const mappingTableBody: Record<TableMode, ({ operations }: { operations: Rows }) => JSX.Element> = {
  whole: WholeBody,
  groups: GroupedBody,
};

export const Table = ({
  headers,
  operations,
  mode,
}: {
  headers: Row;
  operations: Rows;
  mode: TableMode;
}) => {
  const Body = mappingTableBody[mode];

  return (
    <table className={style.table}>
      <TableHeader headers={headers} />
      <Body operations={operations}/>
    </table>
  );
};
