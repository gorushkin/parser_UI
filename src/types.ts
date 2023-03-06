import { Transaction } from 'parser';

export type TableMode = 'groups' | 'whole';

export type Column =
  | 'description'
  | 'payee'
  | 'transactionDate'
  | 'processDate'
  | 'amount'
  | 'balance'
  | 'memo'
  | 'data';

export type TransactionGroup = Record<string, Transaction[]>;

export type Value = string | Date | number;
export type PropertyType = 'number' | 'date' | 'string';
export type RowMode = 'allColumns' | 'dataColumn';
