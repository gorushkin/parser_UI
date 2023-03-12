import {
  createContext,
  ReactElement,
  useState,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import { read, write } from '../utils/db';
import { sendFile } from '../services/api';
import { Context, FileInfo, Page, Func, Transaction, Sheet } from '../types';

const AppContext = createContext<Context | null>(null);

const AppContextProvider = ({ children }: { children: ReactElement }) => {
  const [fileInfo, setFileInfo] = useState<FileInfo>({
    name: null,
    size: null,
    content: null,
  });
  const [page, setPage] = useState<Page>('first');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isStorageEmpty, setIsStorageEmpty] = useState<boolean>(true);
  const [isDataSynced, setIsDataSynced] = useState(false);

  // useEffect(() => {
  //   setIsStorageEmpty(!read());
  // }, []);

  // TODO: wrap functions in useCallback

  // const compareData = () => {
  //   const savedData = read();
  //   setIsDataSynced(JSON.stringify(savedData) === JSON.stringify(transactions));
  // };

  // useEffect(() => {
  //   compareData();
  // }, [transactions]);

  const updateTransactions = (func: Func) => {
    setTransactions(func);
  };

  // const writeTransactions = (data: Transaction[]) => {
  //   const extendedTransactions: Transaction[] = data.map((item) => ({
  //     ...item,
  //     isReady: false,
  //   }));
  //   setTransactions(extendedTransactions);
  // };

  const onStartClick = async (name: string) => {
    if (!fileInfo.content) return;
    const { transactions } = await sendFile({ file: fileInfo.content, name });
    const sheet: Sheet = { name, transactions };
    // writeTransactions(transactions);
    // setPage('second');
  };

  // const saveTransactions = () => {
  //   write(transactions);
  //   compareData();
  // };

  // const loadTransactions = () => {
  //   const data = read();
  //   if (!data) return;
  //   writeTransactions(data);
  //   setPage('second');
  // };

  const context = useMemo(
    () => ({
      fileInfo,
      setFileInfo,
      page,
      onStartClick,
      isStorageEmpty,
      // saveTransactions,
      transactions,
      // loadTransactions,
      updateTransactions,
      isDataSynced,
      setPage,
    }),
    [
      fileInfo,
      page,
      transactions,
      isStorageEmpty,
      // saveTransactions,
      // loadTransactions,
      updateTransactions,
      isDataSynced,
      setPage,
      onStartClick,
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
