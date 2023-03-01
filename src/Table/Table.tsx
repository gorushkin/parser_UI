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

const TableBody = ({ operations }: { operations: Rows }) => {
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

export const Table = ({ headers, operations }: { headers: Row; operations: Rows }) => {
  return (
    <table className={style.table}>
      <TableHeader headers={headers} />
      <TableBody operations={operations} />
    </table>
  );
};
