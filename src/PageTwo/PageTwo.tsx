import { useState } from 'react';
import { useExportContext } from '../AppContext/AppContext';
import { Row, Rows, Parser } from '../parser';
import style from './PageTwo.module.scss';
import { Menu } from '../Menu';

const columns = ['TRANSACTION DATE', 'TRANSACTION NAME', 'AMOUNT', 'BALANCE', 'NARRATIVE'];

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

const parser = new Parser();

export const PageTwo = () => {
  const [activeList, setActiveList] = useState(columns);
  const { fileInfo } = useExportContext();

  const parsedData = parser.parse(fileInfo.content);

  if (!parsedData) return null;

  const { headers, operations } = parsedData;

  const filteredHeaders = headers.map((item) => ({
    ...item,
    isVisible: activeList.includes(item.displayValue),
  }));

  const filteredOperations = operations.map((row) =>
    row.map((item) => ({
      ...item,
      isVisible: activeList.includes(item.key),
    }))
  );

  const handleButtonClick = (key: string): void => {
    setActiveList((state) =>
      activeList.includes(key) ? state.filter((item) => item !== key) : [...state, key]
    );
  };

  const handleShowAllMenuCLick = () => setActiveList(headers.map((item) => item.key));

  return (
    <div className={style.wrapper}>
      <div className={style.menuWrapper}>
        <Menu
          handleShowAllMenuCLick={handleShowAllMenuCLick}
          handleMenuReset={() => setActiveList(columns)}
          handleButtonClick={handleButtonClick}
          headers={headers}
          activeList={activeList}
        />
      </div>
      <table className={style.table}>
        <TableHeader headers={filteredHeaders} />
        <TableBody operations={filteredOperations} />
      </table>
    </div>
  );
};
