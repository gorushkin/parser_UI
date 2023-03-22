import { useEffect, useState } from 'react';
import { Table } from './Table';
import { Menu } from '../../Menu';
import style from './Transactions.module.scss';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getFile } from '../../services/api';
import { Transaction } from 'parser';
import { db } from '../../utils/db';

export const Transactions = () => {
  const [tableState, setTableState] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const { statementName } = useParams();

  const { handler, isLoading, error } = useFetch(getFile, {
    onSuccess: (data: Transaction[]) => {
      if (!statementName) return;
      db.writeData(data, statementName);
      setTransactions(data);
    },
  });

  useEffect(() => {
    if (!statementName) return;
    const savedData = db.readData(statementName);
    if (!savedData?.length) {
      handler(statementName);
      return;
    }
    setTransactions(savedData || []);
  }, []);

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
