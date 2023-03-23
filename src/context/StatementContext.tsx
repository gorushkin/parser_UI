import {
  createContext,
  ReactElement,
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useFetch } from '../hooks/useFetch';
import { getStatement, updateStatement } from '../services/api';
import { db } from '../utils/db';
import { useParams } from 'react-router-dom';
import { compareStatements } from '../utils/utils';
import { Statement, Transaction } from '../types';

type Context = {
  transactions: Statement;
  isDataSynced: boolean;
  setTransactions: React.Dispatch<React.SetStateAction<Statement>>;
  setIsDateSynced: React.Dispatch<React.SetStateAction<boolean>>;
  handleResetClick: () => void;
  tableState: boolean;
  isLoading: boolean;
  error: any;
  updateTransaction: (id: string, updatedTransaction: Transaction) => void;
  handleSaveClick: () => void;
  handleLoadClick: () => void;
  handleCompareData: () => void;
};

const StatementContext = createContext<Context | null>(null);

type Mode = 'get' | 'compare' | 'update';

const StatementContextProvider = ({ children }: { children: ReactElement }) => {
  const [transactions, setTransactions] = useState<Statement>([]);
  const [isDataSynced, setIsDateSynced] = useState<boolean>(false);
  const [tableState, setTableState] = useState<boolean>(false);

  const { statementName } = useParams();

  const onGetStatement = useCallback((syncedData: Statement) => {
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

  const onForceUpdateStatement = useCallback((statement: Statement) => {
    if (!statementName) return;
    db.writeData(statement, statementName);
    setTransactions(statement);
    setIsDateSynced(true);
  }, []);

  const onCompareHandler = useCallback((statement: Statement) => {
    if (!statementName) return;
    const dBData = db.readData(statementName);
    setIsDateSynced(dBData ? compareStatements(statement, dBData) : false);
  }, []);

  const actionMappimg: Record<Mode, (statement: Statement) => void> = {
    get: onGetStatement,
    compare: onCompareHandler,
    update: onForceUpdateStatement,
  };

  const mode = useRef<Mode>('get');

  const [{ isLoading, error }, getStatementHandler] = useFetch(getStatement, {
    onSuccess: useCallback(
      (statement: Statement) => {
        console.log('fff');
        const handler = actionMappimg[mode.current];
        handler(statement);
        mode.current = 'get';
      },
      [mode]
    ),
  });

  const handleResetClick = () => setTableState((state) => !state);

  const [shouldUpdate, setShouldUpdate] = useState(false);

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
    getStatementHandler(statementName);
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
    mode.current = 'get';
    updateStatementHandler({ name: statementName, statement: transactions });
  };

  const handleLoadClick = () => {
    mode.current = 'update';
    getStatementHandler(statementName);
  };

  const handleCompareData = () => {
    mode.current = 'compare';
    getStatementHandler(statementName);
  };

  const context = useMemo(
    () => ({
      transactions,
      setTransactions,
      isDataSynced,
      setIsDateSynced,
      handleResetClick,
      tableState,
      handleCompareData,
      handleLoadClick,
      handleSaveClick,
      updateTransaction,
      isLoading,
      error,
    }),
    [
      transactions,
      setTransactions,
      isDataSynced,
      setIsDateSynced,
      handleResetClick,
      tableState,
      handleCompareData,
      handleLoadClick,
      handleSaveClick,
      updateTransaction,
      isLoading,
      error,
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

  return context;
};

export { useStatementContext, StatementContextProvider };
