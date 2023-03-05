import { Column } from './types';

export const columns: { label: string; value: Column }[] = [
  { label: 'Process Date', value: 'processDate' },
  { label: 'Transaction Date', value: 'transactionDate' },
  { label: 'Amount', value: 'amount' },
  { label: 'Balance', value: 'balance' },
  { label: 'Description', value: 'description' },
  { label: 'Payee', value: 'payee' },
  { label: 'Memo', value: 'memo' },
];
