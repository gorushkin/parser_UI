import { useState } from 'react';
import { useExportContext } from '../../AppContext/AppContext';
import { Table } from '../../components/Table';
import { Menu } from '../../Menu';
import style from './PageTwo.module.scss';

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
