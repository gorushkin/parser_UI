import { useState } from 'react';
import { Table } from './Table';
import { Menu } from '../../Menu';
import style from './Statement.module.scss';

import {
  StatementContextProvider,
  useStatementContext,
} from '../../AppContext/StatementContext';

const Statement = () => {
  const [tableState, setTableState] = useState<boolean>(false);

  const { error, isLoading, transactions } = useStatementContext();

  const handleResetClick = () => setTableState((state) => !state);

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className={style.wrapper}>
      {error ? (
        <h1>There is an error</h1>
      ) : (
        <>
          <div className={style.menuWrapper}>
            <Menu onResetClick={handleResetClick} />
          </div>
          <Table tableState={tableState} transactions={transactions} />
        </>
      )}
    </div>
  );
};

export const StatementProvider = () => (
  <StatementContextProvider>
    <Statement />
  </StatementContextProvider>
);
