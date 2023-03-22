import { useState } from 'react';
import { Table } from './Table';
import { Menu } from '../../Menu';
import style from './Statement.module.scss';

import {
  StatementContextProvider,
  useStatementContext,
} from '../../context/StatementContext';

const Statement = () => {
  const { error, isLoading } = useStatementContext();

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className={style.wrapper}>
      {error ? (
        <h1>There is an error</h1>
      ) : (
        <>
          <div className={style.menuWrapper}>
            <Menu />
          </div>
          <Table />
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
