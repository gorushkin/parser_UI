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

export type Transactions = Transaction[];

export type Payee = { id: string; name: string; displayName: string };
export type Payees = Record<string, Payee>;

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

export type TransactionGroup = Record<string, Transactions>;

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
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

export type Func = (transactions: Transactions) => Transactions;

export type FileResponse = { transactions: Transactions; payees: Payees };

export type Sheet = { name: string; transactions: Transactions };

export type Filenames = string[];
