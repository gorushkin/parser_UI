import { Transaction } from './parser';

export type TableMode = 'groups' | 'whole';

export type Column =
  | 'description'
  | 'payee'
  | 'transactionDate'
  | 'processDate'
  | 'amount'
  | 'balance'
  | 'memo';

export type TransactionGroup = Record<string, Transaction[]>;
