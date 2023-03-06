import { useState } from 'react';
import { useExportContext } from '../AppContext/AppContext';
import style from './PageTwo.module.scss';
import { Menu } from '../Menu';
import { Table } from '../Table';
import { Parser } from 'parser';

export const PageTwo = () => {
  const { fileInfo } = useExportContext();
  const [tableState, setTableState] = useState<boolean>(false);

  const handleResetClick = () => setTableState((state) => !state);

  const parser = new Parser();

  const transactions = parser.parse(fileInfo.content);

  if (!transactions) return null;

  return (
    <div className={style.wrapper}>
      <div className={style.menuWrapper}>
        <Menu onResetClick={handleResetClick} />
      </div>
      <Table tableState={tableState} transactions={transactions} />
    </div>
  );
};
