import { useState } from 'react';
import { useExportContext } from '../AppContext/AppContext';
import { Parser, Transaction } from '../parser';
import style from './PageTwo.module.scss';
import { Menu } from '../Menu';
import { Table } from '../Table';
import { TransactionGroup, TableMode } from '../types';
// type Group = { date: string; data: Transaction[] };

// const visibleColumns: Property[] = [
//   'TRANSACTION DATE',
//   'TRANSACTION  NAME',
//   'AMOUNT',
//   'BALANCE',
//   'NARRATIVE',
//   'PAYEE',
// ];

const parser = new Parser();

export const PageTwo = () => {
  // const [activeList, setActiveList] = useState(visibleColumns);
  const { fileInfo } = useExportContext();
  const [tableMode, setTableMode] = useState<TableMode>('whole');

  const handleModeButtonClick = (mode: TableMode) => {
    setTableMode(mode);
  };

  const transactions = parser.parse(fileInfo.content);

  if (!transactions) return null;

  const groupedTransactions = transactions.reduce((groups: TransactionGroup, item) => {
    const date = item.processDate.displayValue;
    return { ...groups, [date]: [...(groups[date] || []), item] };
  }, {} as TransactionGroup);


  // const filteredHeaders: Header[] = columns.map((item) => ({
  //   key: item,
  //   isVisible: activeList.includes(item),
  // }));

  // const filteredOperations = operations.map((row) =>
  //   row.map((item) => ({
  //     ...item,
  //     isVisible: activeList.includes(item.key),
  //   }))
  // );

  // const handleButtonClick = (key: Property): void => {
  //   setActiveList((state) =>
  //     activeList.includes(key) ? state.filter((item) => item !== key) : [...state, key]
  //   );
  // };

  // const handleShowAllMenuCLick = () => setActiveList(columns);

  return (
    <div className={style.wrapper}>
      {/* <div className={style.menuWrapper}>
        <Menu
          handleShowAllMenuCLick={handleShowAllMenuCLick}
          handleMenuReset={() => setActiveList(visibleColumns)}
          handleButtonClick={handleButtonClick}
          columns={columns}
          activeList={activeList}
          mode={tableMode}
          onClick={handleModeButtonClick}
        />
      </div> */}
      <Table mode={tableMode} transactions={groupedTransactions} />
    </div>
  );
};
