import { Row, Header, TableMode } from '../types';
import style from './Table.module.scss';

const TableHeader = ({ headers }: { headers: Header[] }) => (
  <thead>
    <tr>
      {headers
        .filter((item) => item.isVisible)
        .map((item) => (
          <th key={item.key}>{item.key}</th>
        ))}
    </tr>
  </thead>
);

const GroupedBody = ({ operations }: { operations: Row[] }) => {
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

const WholeBody = ({ operations }: { operations: Row[] }) => {
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

const mappingTableBody: Record<TableMode, ({ operations }: { operations: Row[] }) => JSX.Element> = {
  whole: WholeBody,
  groups: GroupedBody,
};

export const Table = ({
  headers,
  operations,
  mode,
}: {
  headers: Header[];
  operations: Row[];
  mode: TableMode;
}) => {
  const Body = mappingTableBody[mode];

  return (
    <table className={style.table}>
      <TableHeader headers={headers} />
      <Body operations={operations} />
    </table>
  );
};
