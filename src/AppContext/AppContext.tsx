import {
  createContext,
  ReactElement,
  useState,
  useMemo,
  useContext,
} from 'react';
import { Context, FileInfo, Page, Func, Transaction } from '../types';

const AppContext = createContext<Context | null>(null);

const AppContextProvider = ({ children }: { children: ReactElement }) => {
  const [fileInfo, setFileInfo] = useState<FileInfo>({
    name: null,
    size: null,
    content: null,
  });
  const [page, setPage] = useState<Page>('first');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const updateTransactions = (func: Func) => {
    setTransactions(func);
  };

  const context = useMemo(
    () => ({
      fileInfo,
      setFileInfo,
      page,
      transactions,
      updateTransactions,
      setPage,
    }),
    [
      fileInfo,
      page,
      transactions,
      updateTransactions,
      setPage,
    ]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

const useExportContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error('Something wrong wih your context');

  return context;
};

export { AppContextProvider, useExportContext };
