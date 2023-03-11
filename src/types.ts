export type Transaction = {
  id: string;
  description: string;
  payeeId: string;
  payeeName: string;
  transactionDate: string;
  processDate: string;
  amount: number;
  balance: number;
  memo: string;
  data: string;
  isClear: boolean;
};

export type TableMode = 'groups' | 'whole';

export type Column =
  | 'description'
  | 'payeeName'
  | 'transactionDate'
  | 'processDate'
  | 'amount'
  | 'balance'
  | 'memo'
  | 'data'
  | 'isClear';

export type TransactionGroup = Record<string, Transaction[]>;

export type Value = string | Date | number | boolean;
export type PropertyType = 'number' | 'date' | 'string' | 'boolean';
export type RowMode = 'allColumns' | 'dataColumn';

export type FileInfo = {
  name: string | null;
  size: number | null;
  content: File | null;
};

export type Page = 'first' | 'second';

export type Context = {
  fileInfo: FileInfo;
  setFileInfo: React.Dispatch<React.SetStateAction<FileInfo>>;
  page: Page;
  handleStartClick: () => void;
  isStorageEmpty: boolean;
  saveTransactions: () => void;
  transactions: Transaction[];
  loadTransactions: () => void;
  updateTransactions: (func: Func) => void;
  isDataSynced: boolean;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

export type Func = (transactions: Transaction[]) => Transaction[];
