import { useState } from 'react';
import style from './PageTwo.module.scss';
import { Menu } from '../Menu';
import { Table } from '../Table';
import { useExportContext } from '../AppContext/AppContext';

export const PageTwo = () => {
  const { transactions } = useExportContext();
  const [tableState, setTableState] = useState<boolean>(false);

  const handleResetClick = () => setTableState((state) => !state);

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
