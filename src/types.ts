import { Transaction as ParserTransaction } from 'parser';

export type TableMode = 'groups' | 'whole';

export type Column =
  | 'description'
  | 'payee'
  | 'transactionDate'
  | 'processDate'
  | 'amount'
  | 'balance'
  | 'memo'
  | 'data'
  | 'isClear';

export type TransactionGroup = Record<string, ParserTransaction[]>;

export type Value = string | Date | number | boolean;
export type PropertyType = 'number' | 'date' | 'string' | 'boolean';
export type RowMode = 'allColumns' | 'dataColumn';

export type FileInfo = {
  name: string | null;
  size: number | null;
  content: string | null;
};

export type Page = 'first' | 'second';

export type Context = {
  fileInfo: FileInfo;
  setFileInfo: React.Dispatch<React.SetStateAction<FileInfo>>;
  page: Page;
  handleStartClick: () => void;
  isStorageEmpty: boolean;
  saveTransactions: () => void;
  transactions: ParserTransaction[];
  loadTransactions: () => void;
  updateTransactions: (func: Func) => void;
  isDataSynced: boolean;
};

// export type Transaction = ParserTransaction & {
//   isReady: boolean;
// };

export type Func = (transactions: ParserTransaction[]) => ParserTransaction[];
