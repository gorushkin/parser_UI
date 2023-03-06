import { Column } from './types';

export const columns: { label: string; value: Column; isVisible: boolean }[] = [
  { label: 'Transaction Date', value: 'transactionDate', isVisible: true },
  { label: 'Process Date', value: 'processDate', isVisible: true },
  { label: 'Amount', value: 'amount', isVisible: true },
  { label: 'Balance', value: 'balance', isVisible: true },
  { label: 'Description', value: 'description', isVisible: true },
  { label: 'Payee', value: 'payee', isVisible: true },
  { label: 'Memo', value: 'memo', isVisible: true },
  { label: 'Show raw', value: 'data', isVisible: false },
];
