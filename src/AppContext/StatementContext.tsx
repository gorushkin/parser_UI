import {
  createContext,
  ReactElement,
  useState,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import { Transaction } from 'parser';
import { useFetch } from '../hooks/useFetch';
import { getFile } from '../services/api';
import { db } from '../utils/db';
import { useParams } from 'react-router-dom';

type Context = {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
};

const StatementContext = createContext<Context | null>(null);

const StatementContextProvider = ({ children }: { children: ReactElement }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const context = useMemo(
    () => ({
      transactions,
      setTransactions,
    }),
    [transactions, setTransactions]
  );

  return (
    <StatementContext.Provider value={context}>
      {children}
    </StatementContext.Provider>
  );
};

const useStatementContext = () => {
  const context = useContext(StatementContext);

  if (!context) throw new Error('Something wrong wih your context');
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

  const { setTransactions, transactions } = context;

  return { isLoading, transactions, error };
};

export { useStatementContext, StatementContextProvider };
