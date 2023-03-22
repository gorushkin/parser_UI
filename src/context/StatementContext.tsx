import {
  createContext,
  ReactElement,
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { Transaction } from 'parser';
import { useFetch } from '../hooks/useFetch';
import { getFile, updateStatement } from '../services/api';
import { db } from '../utils/db';
import { useParams } from 'react-router-dom';
import { compareStatements } from '../utils/utils';

type Context = {
  transactions: Transaction[];
  isDataSynced: boolean;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setIsDateSynced: React.Dispatch<React.SetStateAction<boolean>>;
  handleResetClick: () => void;
  tableState: boolean;
};

const StatementContext = createContext<Context | null>(null);

const StatementContextProvider = ({ children }: { children: ReactElement }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDataSynced, setIsDateSynced] = useState<boolean>(false);
  const [tableState, setTableState] = useState<boolean>(false);

  const handleResetClick = () => setTableState((state) => !state);

  const context = useMemo(
    () => ({
      transactions,
      setTransactions,
      isDataSynced,
      setIsDateSynced,
      handleResetClick,
      tableState,
    }),
    [
      transactions,
      setTransactions,
      isDataSynced,
      setIsDateSynced,
      handleResetClick,
      tableState,
    ]
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
  const {
    setTransactions,
    transactions,
    setIsDateSynced,
    isDataSynced,
    handleResetClick,
    tableState,
  } = context;

  const [shouldUpdate, setShouldUpdate] = useState(false);

  const { statementName } = useParams();

  const onGetFileSuccess = useCallback((syncedData: Transaction[]) => {
    if (!statementName) return;
    const dBData = db.readData(statementName);
    if (!dBData) {
      db.writeData(syncedData, statementName);
      setTransactions(syncedData);
      setIsDateSynced(true);
      return;
    }
    const isDateEqial = compareStatements(syncedData, dBData);
    setIsDateSynced(isDateEqial);
    setTransactions(dBData);
    setIsDateSynced(isDateEqial);
  }, []);

  const [{ isLoading, error }, getFileHandler] = useFetch(getFile, {
    onSuccess: onGetFileSuccess,
  });

  const [, updateStatementHandler] = useFetch(updateStatement, {
    onSuccess: (data: string) => {
      console.log('data: ', data);
      setIsDateSynced(true);
    },
  });

  useEffect(() => {
    if (!statementName || !shouldUpdate) return;
    db.writeData(transactions, statementName);
    setShouldUpdate(false);
  }, [transactions, shouldUpdate]);

  useEffect(() => {
    getFileHandler(statementName);
  }, []);

  const updateTransaction = useCallback(
    (id: string, updatedTransaction: Transaction) => {
      setTransactions((state) =>
        state.map((item) => (item.id === id ? updatedTransaction : item))
      );
      setIsDateSynced(false);
      setShouldUpdate(true);
    },
    []
  );

  const handleSaveClick = () => {
    updateStatementHandler({ name: statementName, statement: transactions });
  };

  const handleLoadClick = () => {
    console.log('handleLoadClick');
  };

  return {
    isLoading,
    transactions,
    error,
    updateTransaction,
    isDataSynced,
    handleResetClick,
    tableState,
    handleSaveClick,
    handleLoadClick,
  };
};

export { useStatementContext, StatementContextProvider };
