import { useState } from 'react';
import { useExportContext } from '../AppContext/AppContext';
import { Parser } from '../parser';
import style from './PageTwo.module.scss';
import { Menu } from '../Menu';
import { Table } from '../Table';

const columns = ['TRANSACTION DATE', 'TRANSACTION NAME', 'AMOUNT', 'BALANCE', 'NARRATIVE'];

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
      <Table headers={filteredHeaders} operations={filteredOperations} />
    </div>
  );
};
